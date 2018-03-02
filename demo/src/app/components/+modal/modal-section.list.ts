import { DemoModalServiceStaticComponent } from './demos/service-template/service-template';
import { DemoModalServiceFromComponent } from './demos/service-component/service-component';
import { DemoModalServiceNestedComponent } from './demos/service-nested/service-nested';
import { DemoModalServiceEventsComponent } from './demos/service-events/service-events';
import { DemoModalServiceDisableAnimationComponent } from './demos/service-options/disable-animation/disable-animation';
import { DemoModalServiceCustomCSSClassComponent } from './demos/service-options/custom-css-class/custom-css-class';
import { DemoModalServiceDisableEscClosingComponent } from './demos/service-options/disable-esc-closing/disable-esc-closing';
import { DemoModalServiceDisableBackdropComponent } from './demos/service-options/disable-backdrop/disable-backdrop';
import { DemoModalServiceConfirmWindowComponent } from './demos/service-confirm-window/service-confirm-window';

import { DemoModalStaticComponent } from './demos/static/static';
import { DemoModalSizesComponent } from './demos/sizes/sizes';
import { DemoModalChildComponent } from './demos/child/child';
import { DemoModalNestedComponent } from './demos/nested/nested';
import { DemoModalEventsComponent } from './demos/events/events';
import { DemoAutoShownModalComponent } from './demos/auto-shown/auto-shown';
import { DemoModalWithPopupsComponent } from './demos/modal-with-popups/modal-with-popups';

import { ContentSection } from '../../docs/models/content-section.model';
import { DemoTopSectionComponent } from '../../docs/demo-section-components/demo-top-section/index';
import { ExamplesComponent } from '../../docs/demo-section-components/demo-examples-section/index';
import { ApiSectionsComponent } from '../../docs/demo-section-components/demo-api-section/index';

import {
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from '../../docs/api-docs';
import { DemoModalScrollingLongContentComponent } from './demos/scrolling-long-content/scrolling-long-content';

export const demoComponentContent: ContentSection[] = [
  {
    name: 'Usage',
    anchor: 'usage',
    outlet: DemoTopSectionComponent,
    content: {
      doc: require('!!raw-loader?lang=typescript!./docs/usage.md')
    }
  },
  {
    name: 'Service examples',
    anchor: 'service-section',
    outlet: ExamplesComponent,
    description: `
      <p>Open a modal from service.</p>
      <p>To be able to open modals from service, inject BsModalService to your constructor.<br>Then, call
      <code>.show()</code> method of modal service. Pass a TemplateRef or a component as a first argument and
      config as a second (optionally). <br> <code>.show()</code> method returns an instance of BsModalRef
      class with <code>.hide()</code> method and <code>content</code> property where you'll find a component
      which you've passed to service.</p>`,
    content: [
      {
        title: 'Template',
        anchor: 'service-template',
        component: require('!!raw-loader?lang=typescript!./demos/service-template/service-template.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-template/service-template.html'),
        outlet: DemoModalServiceStaticComponent
      },
      {
        title: 'Component',
        anchor: 'service-component',
        component: require('!!raw-loader?lang=typescript!./demos/service-component/service-component.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-component/service-component.html'),
        description: `<p>Creating a modal with component just as easy as it is with template. Just pass your component
          in <code>.show()</code> method as in example, and don't forget to include your component to
          <code>entryComponents</code> of your NgModule<br> If you passed a component
          to <code>.show()</code> you can get access to opened modal by injecting BsModalRef. Also you can pass data 
          in your modal by adding <code>initialState</code> field in config. See example for more info</p>`,
        outlet: DemoModalServiceFromComponent
      },
      {
        title: 'Nested',
        anchor: 'service-nested',
        component: require('!!raw-loader?lang=typescript!./demos/service-nested/service-nested.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-nested/service-nested.html'),
        description: `<p>Nested modals are supported</p>`,
        outlet: DemoModalServiceNestedComponent
      },
      {
        title: 'Scrolling long content',
        anchor: 'scrolling-long-content',
        component: require('!!raw-loader?lang=typescript!./demos/scrolling-long-content/scrolling-long-content.ts'),
        html: require('!!raw-loader?lang=markup!./demos/scrolling-long-content/scrolling-long-content.html'),
        outlet: DemoModalScrollingLongContentComponent
      },
      {
        title: 'Events',
        anchor: 'service-events',
        component: require('!!raw-loader?lang=typescript!./demos/service-events/service-events.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-events/service-events.html'),
        description: `
          <p>Modal service events. Modal service exposes 4 events: onShow, onShown, onHide, onHidden.
          See usage example below.</p>
          <p>onHide and onHidden emit dismiss reason. Possible values are <code>backdrop-click</code>,
          <code>esc</code> or <code>null</code> if modal was closed by direct call of <code>hide()</code></p>`,
        outlet: DemoModalServiceEventsComponent
      },
      {
        title: 'Confirm Window',
        anchor: 'confirm-window',
        component: require('!!raw-loader?lang=typescript!./demos/service-confirm-window/service-confirm-window.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-confirm-window/service-confirm-window.html'),
        description: `<p>Modal with buttons to confirm.</p>`,
        outlet: DemoModalServiceConfirmWindowComponent
      },
      {
        title: 'Сustom css class',
        anchor: 'service-custom-css-class',
        component: require('!!raw-loader?lang=typescript!./demos/service-options/custom-css-class/custom-css-class.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-options/custom-css-class/custom-css-class.html'),
        description: `<p>There is additional css classes that you can configure.
          See the demo below to learn how to configure your modal</p>`,
        outlet: DemoModalServiceCustomCSSClassComponent
      },
      {
        title: 'Animation option',
        anchor: 'service-disable-animation',
        component: require('!!raw-loader?lang=typescript!./demos/service-options/disable-animation/disable-animation.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-options/disable-animation/disable-animation.html'),
        description: `<p>There is animation option that you can configure.</p>`,
        outlet: DemoModalServiceDisableAnimationComponent
      },
      {
        title: 'Esc closing option',
        anchor: 'service-disable-animation',
        component: require('!!raw-loader?lang=typescript!./demos/service-options/disable-esc-closing/disable-esc-closing.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-options/disable-esc-closing/disable-esc-closing.html'),
        description: `<p>There is closing by Esc button option that you can configure.</p>`,
        outlet: DemoModalServiceDisableEscClosingComponent
      },
      {
        title: 'Modal window with other components',
        anchor: 'modal-with-popups',
        component: require('!!raw-loader?lang=typescript!./demos/modal-with-popups/modal-with-popups.ts'),
        html: require('!!raw-loader?lang=markup!./demos/modal-with-popups/modal-with-popups.html'),
        description: `<p>Modals work fine with other components. In this example, there are <code>popover</code> and <code>tooltip</code> in the modal.</p>`,
        outlet: DemoModalWithPopupsComponent
      },
      {
        title: 'Backdrop options',
        anchor: 'service-disable-backdrop',
        component: require('!!raw-loader?lang=typescript!./demos/service-options/disable-backdrop/disable-backdrop.ts'),
        html: require('!!raw-loader?lang=markup!./demos/service-options/disable-backdrop/disable-backdrop.html'),
        description: `<p>There is backdrop options that you can configure.</p>`,
        outlet: DemoModalServiceDisableBackdropComponent
      }
    ]
  },
  {
    name: 'Directive examples',
    anchor: 'directive-section',
    outlet: ExamplesComponent,
    description: `<p>Also you can use directive instead of service. See the demos below </p>`,
    content: [
      {
        title: 'Static modal',
        anchor: 'directive-static',
        component: require('!!raw-loader?lang=typescript!./demos/static/static.ts'),
        html: require('!!raw-loader?lang=markup!./demos/static/static.html'),
        outlet: DemoModalStaticComponent
      },
      {
        title: 'Optional sizes',
        anchor: 'directive-sizes',
        component: require('!!raw-loader?lang=typescript!./demos/sizes/sizes.ts'),
        html: require('!!raw-loader?lang=markup!./demos/sizes/sizes.html'),
        outlet: DemoModalSizesComponent
      },
      {
        title: 'Child modal',
        anchor: 'directive-child',
        component: require('!!raw-loader?lang=typescript!./demos/child/child.ts'),
        html: require('!!raw-loader?lang=markup!./demos/child/child.html'),
        description: `<p>Control modal from parent component</p>`,
        outlet: DemoModalChildComponent
      },
      {
        title: 'Nested modals',
        anchor: 'directive-nested',
        component: require('!!raw-loader?lang=typescript!./demos/nested/nested.ts'),
        html: require('!!raw-loader?lang=markup!./demos/nested/nested.html'),
        description: `<p>Open a modal from another modal</p>`,
        outlet: DemoModalNestedComponent
      },
      {
        title: 'Modal events',
        anchor: 'directive-events',
        component: require('!!raw-loader?lang=typescript!./demos/events/events.ts'),
        html: require('!!raw-loader?lang=markup!./demos/events/events.html'),
        description: `<p>ModalDirective exposes 4 events: OnShow, OnShown, OnHide, OnHidden. See
          usage example below.<br> <code>$event</code> is an instance of ModalDirective. There you may
          find some useful properties like <code>isShown</code>, <code>dismissReason</code>, etc.
          <br>For example, you may want to know which one of user's actions caused closing of a modal.
          Just get the value of <code>dismissReason</code>, possible values are <code>backdrop-click</code>,
          <code>esc</code> or <code>null</code> if modal was closed by direct call of <code>hide()</code></p>`,
        outlet: DemoModalEventsComponent
      },
      {
        title: 'Auto shown modal',
        anchor: 'directive-auto-shown',
        component: require('!!raw-loader?lang=typescript!./demos/auto-shown/auto-shown.ts'),
        html: require('!!raw-loader?lang=markup!./demos/auto-shown/auto-shown.html'),
        description: `
          <p>Show modal right after it has been initialized. This allows you to keep DOM clean by only
          appending visible modals to the DOM using <code>*ngIf</code> directive.</p>
          <p>It can also be useful if you want your modal component to perform some initialization operations, but
          want to defer that until user actually sees modal content. I.e. for a "Select e-mail recipient" modal
          you might want to defer recipient list loading until the modal is shown.</p>`,
        outlet: DemoAutoShownModalComponent
      }
    ]
  },
  {
    name: 'API Reference',
    anchor: 'api-reference',
    outlet: ApiSectionsComponent,
    content: [
      {
        title: 'ModalDirective',
        anchor: 'modal-directive',
        outlet: NgApiDocComponent
      },
      {
        title: 'ModalBackdropComponent',
        anchor: 'modal-backdrop-component',
        outlet: NgApiDocComponent
      },
      {
        title: 'BsModalService',
        anchor: 'bs-modal-service',
        outlet: NgApiDocClassComponent
      },
      {
        title: 'BsModalRef',
        anchor: 'bs-modal-ref',
        outlet: NgApiDocClassComponent
      },
      {
        title: 'ModalOptions',
        anchor: 'modal-options',
        outlet: NgApiDocConfigComponent
      }
    ]
  }
];
