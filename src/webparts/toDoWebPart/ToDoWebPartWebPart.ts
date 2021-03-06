import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ToDoWebPartWebPartStrings';
import ToDoWebPart from './components/ToDoWebPart';
import { IToDoWebPartProps } from './components/IToDoWebPartProps';

export interface IToDoWebPartWebPartProps {
  description: string;
}

export default class ToDoWebPartWebPart extends BaseClientSideWebPart<IToDoWebPartWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IToDoWebPartProps > = React.createElement(
      ToDoWebPart,
      {
        ctx : this.context,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
