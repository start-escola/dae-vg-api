import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionAboutUsValues extends Schema.Component {
  collectionName: 'components_section_about_us_values';
  info: {
    displayName: 'about_us_values';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionDiretoriaCard extends Schema.Component {
  collectionName: 'components_section_diretoria_cards';
  info: {
    displayName: 'diretoria_card';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    position: Attribute.String;
    picture: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionIndexBannerArea extends Schema.Component {
  collectionName: 'components_section_index_banner_areas';
  info: {
    displayName: 'index_banner_area';
    icon: 'alien';
    description: '';
  };
  attributes: {
    banners: Attribute.Component<'section.index-banner-card', true>;
  };
}

export interface SectionIndexBannerCard extends Schema.Component {
  collectionName: 'components_section_index_banner_cards';
  info: {
    displayName: 'index_banner_card';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Attribute.String;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface SectionPagetitle extends Schema.Component {
  collectionName: 'components_section_pagetitles';
  info: {
    displayName: 'pagetitle';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface TenderStatus extends Schema.Component {
  collectionName: 'components_tender_statuses';
  info: {
    displayName: 'status';
    description: '';
  };
  attributes: {
    date: Attribute.Date;
    name: Attribute.Enumeration<
      ['Aberta', 'Julgamento', 'Finalizada', 'Cancelada']
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'section.about-us-values': SectionAboutUsValues;
      'section.diretoria-card': SectionDiretoriaCard;
      'section.index-banner-area': SectionIndexBannerArea;
      'section.index-banner-card': SectionIndexBannerCard;
      'section.pagetitle': SectionPagetitle;
      'tender.status': TenderStatus;
    }
  }
}
