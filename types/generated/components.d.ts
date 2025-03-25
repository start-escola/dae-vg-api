import type { Schema, Attribute } from '@strapi/strapi';

export interface FolderInternalFile extends Schema.Component {
  collectionName: 'components_folder_internal_files';
  info: {
    displayName: 'InternalFile';
    description: '';
  };
  attributes: {
    file: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

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

export interface SectionImg extends Schema.Component {
  collectionName: 'components_section_imgs';
  info: {
    displayName: 'img';
    description: '';
  };
  attributes: {
    midia: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
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

export interface SectionLink extends Schema.Component {
  collectionName: 'components_section_links';
  info: {
    displayName: 'link';
    icon: 'alien';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    route: Attribute.String;
    sublink: Attribute.Component<'section.sublink', true>;
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

export interface SectionSector extends Schema.Component {
  collectionName: 'components_section_sectors';
  info: {
    displayName: 'sector';
    description: '';
  };
  attributes: {
    sectors: Attribute.Relation<
      'section.sector',
      'oneToMany',
      'api::sectors.sectors'
    >;
    turno: Attribute.Enumeration<['Manh\u00E3', 'Tarde', 'Noite']>;
  };
}

export interface SectionSublink extends Schema.Component {
  collectionName: 'components_section_sublinks';
  info: {
    displayName: 'sublink';
  };
  attributes: {
    href: Attribute.String;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String;
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
      'folder.internal-file': FolderInternalFile;
      'section.about-us-values': SectionAboutUsValues;
      'section.diretoria-card': SectionDiretoriaCard;
      'section.img': SectionImg;
      'section.index-banner-area': SectionIndexBannerArea;
      'section.index-banner-card': SectionIndexBannerCard;
      'section.link': SectionLink;
      'section.pagetitle': SectionPagetitle;
      'section.sector': SectionSector;
      'section.sublink': SectionSublink;
      'tender.status': TenderStatus;
    }
  }
}
