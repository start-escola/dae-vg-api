import WebSocket from "ws";

const token =
  "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IlZiWGxOeWFVQ1VUa1pQcVZzYWs1aXciLCJ0eXAiOiJKV1QifQ.eyJ1bmlxdWVfbmFtZSI6ImRhZXZnIiwianRpIjoiY2I1NDg4Y2EtZmU1MC00OTEyLTk5NDEtYTU1ZjFiZjhkZDc5Iiwicm9sZSI6WyJBcHAiLCJDYWxsRmxvd0FwcCJdLCJuYmYiOjE3NDI0NzM4MTcsImV4cCI6MTc0MjQ3NzQxNywiaWF0IjoxNzQyNDczODE3LCJpc3MiOiJjZW50cmFsc29tYWRhdHRhLm15M2N4LmNvbS5icjo1MDAxIiwiYXVkIjoiL2FwaSJ9.l88rRjjyx7T5EIAFq3OdifYct-xcFct-e9bk5RuHPePBSSRA3yrHdCcn97VzAnJJ5546EdkWr8FhKzyoMkBJ_A";

type CallResponse = {
  id: number;
  status: string;
  dn: string;
  party_caller_name: string;
  party_dn: string;
  party_caller_id: string;
  party_did: string;
  device_id: string;
  party_dn_type: string;
  direct_control: boolean;
  originated_by_dn: string;
  originated_by_type: string;
  referred_by_dn: string;
  referred_by_type: string;
  on_behalf_of_dn: string;
  on_behalf_of_type: string;
  callid: number;
  legid: number;
};

export default {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    return
    let ws: WebSocket | null = null;
    const wsUrl = "wss://centralsomadatta.my3cx.com.br:5001/callcontrol/ws";

    const connectWebSocket = () => {
      console.log("Tentando conectar ao WebSocket...");
      ws = new WebSocket(wsUrl, {
        headers: {
          Authorization: token,
        },
      });

      ws.on("open", () => {
        console.log("Conexão WebSocket estabelecida.");
      });

      const processingRecords = new Set();

      ws.on("message", async (data) => {
        try {
          const parsedData = JSON.parse(data.toString());
          const { entity, event_type } = parsedData.event;

          console.log(parsedData)

          if (event_type === 0 && !processingRecords.has(entity)) {
            await strapi.db.transaction(async () => {
              // Primeiro, verifica se já existe uma chamada com essa entidade
              processingRecords.add(entity)

              const existingCall = await strapi.db
                .query("api::call.call")
                .findOne({
                  where: { entity },
                });

              if (!existingCall) {
                const callReq = await fetch(
                  `https://centralsomadatta.my3cx.com.br:5001${entity}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token,
                    },
                  }
                );
                const response = (await callReq.json()) as CallResponse;
                const protocol = response.callid;
                const callerNumber = response.party_caller_id;
                const timestamp = Date.now();
                const sequence = parsedData.sequence || 0;
                const uniqueId = `${protocol}-${timestamp}-${sequence}`;

                // Apenas cria se não existir!
                await strapi.db.query("api::call.call").create({
                  data: {
                    protocol: uniqueId,
                    callerNumber,
                    status: "Em andamento",
                    entity,
                    callStartTime: new Date(timestamp),
                  },
                });
              } else {
                console.warn(`Registro já existe para entity: ${entity}`);
              }
            });
          }

          if (event_type === 1) {
            await strapi.db.query("api::call.call").update({
              where: { entity },
              data: {
                status: "Finalizada",
                callEndTime: new Date(),
              },
            });

            processingRecords.delete(entity);
          }
        } catch (error) {
          console.error("Erro ao processar mensagem WebSocket:", error);
        }
      });

      ws.on("close", (code, reason) => {
        console.warn(
          `Conexão WebSocket fechada: Código ${code}, Motivo: ${reason}`
        );
        ws = null;
        setTimeout(connectWebSocket, 5000); // Tenta reconectar após 5 segundos
      });

      ws.on("error", (error) => {
        console.error("Erro no WebSocket:", error);
      });

      // Mantém a conexão ativa enviando pings a cada 60 segundos
      setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.ping();
        }
      }, 60000);
    };

    connectWebSocket();
  },
};
