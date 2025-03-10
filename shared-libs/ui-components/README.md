# BeExperience UI Components

A shared library of UI components built with Angular 19 and Tailwind CSS for the BeExperience applications.

## Components

### Button Component

A customizable button component with different variants and sizes.

```html
<ui-button [variant]="'primary'" [size]="'md'" [disabled]="false" (onClick)="handleClick()">
  Click Me
</ui-button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `fullWidth`: boolean (default: false)

**Events:**
- `onClick`: Emitted when the button is clicked

### Card Component

A container component for displaying content in a card format.

```html
<ui-card [title]="'Card Title'" [subtitle]="'Card Subtitle'">
  <p>Card content goes here</p>
</ui-card>
```

**Props:**
- `title`: string (optional)
- `subtitle`: string (optional)
- `padding`: boolean (default: true)
- `footerTemplate`: TemplateRef (optional)

### Input Component

A form input component that supports various input types.

```html
<ui-input 
  [label]="'Email'" 
  [type]="'email'" 
  [placeholder]="'Enter your email'" 
  [required]="true"
  [error]="emailError"
  formControlName="email">
</ui-input>
```

**Props:**
- `label`: string (optional)
- `type`: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' (default: 'text')
- `placeholder`: string (default: '')
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `error`: string (optional)
- `hint`: string (optional)

### Select Component

A dropdown select component for choosing from a list of options.

```html
<ui-select 
  [label]="'Country'" 
  [options]="countries" 
  [placeholder]="'Select a country'"
  [required]="true"
  [error]="countryError"
  formControlName="country">
</ui-select>
```

**Props:**
- `label`: string (optional)
- `options`: SelectOption[] (default: [])
- `placeholder`: string (optional)
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `error`: string (optional)
- `hint`: string (optional)

**SelectOption Interface:**
```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

### Badge Component

A small visual indicator for status, categories, or tags.

```html
<ui-badge [variant]="'success'">Completed</ui-badge>
```

**Props:**
- `variant`: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' (default: 'default')

### Modal Component

A dialog component for displaying content in a modal window.

```html
<ui-modal 
  [isOpen]="isModalOpen" 
  [title]="'Confirmation'" 
  [primaryButtonText]="'Confirm'" 
  [cancelButtonText]="'Cancel'"
  (onClose)="closeModal()"
  (onPrimaryClick)="confirmAction()">
  <p>Are you sure you want to proceed?</p>
</ui-modal>
```

**Props:**
- `isOpen`: boolean (default: false)
- `title`: string (optional)
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `primaryButtonText`: string (optional)
- `secondaryButtonText`: string (optional)
- `cancelButtonText`: string (default: 'Cancel')
- `showFooter`: boolean (default: true)
- `closeOnBackdropClick`: boolean (default: true)

**Events:**
- `onClose`: Emitted when the modal is closed
- `onPrimaryClick`: Emitted when the primary button is clicked
- `onSecondaryClick`: Emitted when the secondary button is clicked

## Installation

```bash
npm install @beexperience/ui-components
```

## Usage

Import the components you need in your Angular module or component:

```typescript
import { ButtonComponent, CardComponent } from '@beexperience/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <ui-card [title]="'Example Card'">
      <p>Card content</p>
      <ui-button (onClick)="handleClick()">Click Me</ui-button>
    </ui-card>
  `
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```