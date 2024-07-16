import type { Schema, Attribute } from '@strapi/strapi';

export interface HeaderLink extends Schema.Component {
  collectionName: 'components_base_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    options: Attribute.Component<'header.options'>;
    href: Attribute.String;
    label: Attribute.String;
  };
}

export interface HeaderOptions extends Schema.Component {
  collectionName: 'components_base_options';
  info: {
    displayName: 'options';
    description: '';
  };
  attributes: {
    href: Attribute.String & Attribute.Required;
    label: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'header.link': HeaderLink;
      'header.options': HeaderOptions;
    }
  }
}
