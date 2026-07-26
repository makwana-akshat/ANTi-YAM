export type ComponentType = 
  | 'text_input' 
  | 'number_input' 
  | 'textarea' 
  | 'slider' 
  | 'switch' 
  | 'checkbox' 
  | 'dropdown' 
  | 'multiselect' 
  | 'date_picker'
  | 'radio_group';

export interface FormOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  component: ComponentType;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  unit?: string;
  min?: number;
  max?: number;
  options?: FormOption[] | string[];
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export interface DiseaseTemplate {
  title: string;
  sections: FormSection[];
}
