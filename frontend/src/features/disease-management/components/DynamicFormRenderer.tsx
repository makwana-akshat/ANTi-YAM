import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { DiseaseTemplate, FormField } from '../types/schema';
import { Button } from '../../../components/ui/Button';
import * as Icons from 'lucide-react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../../../components/ui/interfaces-field';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Checkbox } from '../../../components/ui/checkbox';

interface DynamicFormRendererProps {
  template: DiseaseTemplate;
  onSubmit: (data: Record<string, any>) => void;
  isSubmitting: boolean;
}

function CreatableTagInput({ field, renderProps }: { field: FormField, renderProps: any }) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const currentValues: string[] = Array.isArray(renderProps.value) ? renderProps.value : [];
  
  const predefinedValues = (field.options || []).map((o: any) => o.value || o);
  // Options that are not yet selected
  const availableOptions = (field.options || []).filter((opt: any) => !currentValues.includes(opt.value || opt));

  const handleAdd = (val: string) => {
    if (val && !currentValues.includes(val)) {
      renderProps.onChange([...currentValues, val]);
    }
    setInputValue('');
  };

  const handleRemove = (val: string) => {
    renderProps.onChange(currentValues.filter(v => v !== val));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();
      if (val) handleAdd(val);
    } else if (e.key === 'Backspace' && !inputValue && currentValues.length > 0) {
      // Remove last tag on backspace if input is empty
      handleRemove(currentValues[currentValues.length - 1]);
    }
  };

  return (
    <div className="relative">
      <div 
        className={`flex flex-wrap gap-2 items-center min-h-[48px] w-full rounded-xl border bg-white px-3 py-2 transition-all cursor-text ${
          isFocused ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
        }`}
        onClick={() => document.getElementById(`input-${field.id}`)?.focus()}
      >
        {currentValues.map((val) => {
          const opt = field.options?.find((o: any) => (o.value || o) === val);
          const label = opt ? (opt.label || opt) : val;
          return (
            <span 
              key={val} 
              className="flex items-center bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-sm font-medium group"
            >
              {label}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(val); }}
                className="ml-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full p-0.5 transition-colors focus:outline-none"
              >
                <Icons.X size={14} />
              </button>
            </span>
          );
        })}
        
        <input
          id={`input-${field.id}`}
          type="text"
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
          placeholder={currentValues.length === 0 ? `Select or type ${field.label.toLowerCase()}...` : "Add more..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {isFocused && (availableOptions.length > 0 || inputValue.trim() !== '') && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 max-h-64 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          {inputValue.trim() !== '' && !currentValues.includes(inputValue.trim()) && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAdd(inputValue.trim())}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center text-blue-700 font-medium transition-colors"
            >
              <span className="bg-blue-100 text-blue-700 rounded-md mr-2.5 px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">Enter</span>
              Add "{inputValue.trim()}"
            </button>
          )}
          
          {availableOptions
            .filter((opt: any) => {
              const label = (opt.label || opt).toLowerCase();
              return label.includes(inputValue.toLowerCase());
            })
            .map((opt: any) => {
              const value = opt.value || opt;
              const label = opt.label || opt;
              return (
                <button
                  type="button"
                  key={value}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleAdd(value)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 text-slate-700 transition-colors font-medium flex items-center justify-between group"
                >
                  {label}
                  <Icons.Plus size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
            
          {availableOptions.filter((opt: any) => (opt.label || opt).toLowerCase().includes(inputValue.toLowerCase())).length === 0 && !inputValue.trim() && (
             <div className="px-4 py-3 text-sm text-slate-500 text-center">No options available</div>
          )}
        </div>
      )}
    </div>
  );
}

export function DynamicFormRenderer({ template, onSubmit, isSubmitting }: DynamicFormRendererProps) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const renderFieldComponent = (field: FormField, renderProps: any) => {
    switch (field.component) {
      case 'text_input':
      case 'number_input':
        return (
          <Input
            {...renderProps}
            type={field.component === 'number_input' ? 'number' : 'text'}
            id={field.id}
            placeholder={field.placeholder}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...renderProps}
            id={field.id}
            placeholder={field.placeholder}
          />
        );

      case 'checkbox':
      case 'switch': // Fallback switch to checkbox for now
        return (
          <div className="flex items-center space-x-2 h-12">
            <Checkbox
              id={field.id}
              checked={renderProps.value}
              onCheckedChange={renderProps.onChange}
            />
          </div>
        );

      case 'dropdown':
        return (
          <select
            {...renderProps}
            id={field.id}
            multiple={field.component === 'multiselect'}
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300"
          >
            <option value="">Select an option...</option>
            {field.options?.map((opt: any) => (
              <option key={opt.value || opt} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return <CreatableTagInput field={field} renderProps={renderProps} />;

      case 'slider':
        return (
          <div className="flex items-center space-x-4 h-12">
            <input
              {...renderProps}
              type="range"
              id={field.id}
              min={field.min || 0}
              max={field.max || 10}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="font-bold text-slate-700 w-8 text-center">{renderProps.value || (field.min || 0)}</span>
          </div>
        );

      case 'date_picker':
        return (
          <input
            {...renderProps}
            type="date"
            id={field.id}
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300"
          />
        );

      default:
        return <Input {...renderProps} id={field.id} placeholder="Unsupported field type" />;
    }
  };

  const renderField = (field: FormField) => {
    const IconComponent = field.icon ? (Icons as any)[field.icon] : null;

    return (
      <Field key={field.id} orientation={field.component === 'checkbox' || field.component === 'switch' ? 'horizontal' : 'vertical'}>
        <FieldLabel htmlFor={field.id}>
          {IconComponent && <IconComponent size={16} className="text-slate-400" />}
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </FieldLabel>
        
        <FieldContent>
          <Controller
            name={field.id}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: renderProps }) => renderFieldComponent(field, renderProps)}
          />
          {field.unit && field.component === 'number_input' && (
            <FieldDescription>Unit: {field.unit}</FieldDescription>
          )}
        </FieldContent>

        {errors[field.id] && (
          <FieldError>{errors[field.id]?.message as string}</FieldError>
        )}
      </Field>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-4">
      <FieldGroup>
        {template.sections.map((section, idx) => (
          <FieldSet key={idx} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <div>
              <FieldLegend className="text-xl font-bold text-slate-900">{section.title}</FieldLegend>
              <FieldDescription>Fill in the required information below.</FieldDescription>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {section.fields.map(field => renderField(field))}
            </div>
          </FieldSet>
        ))}
      </FieldGroup>

      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          className="h-14 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Log'}
        </Button>
      </div>
    </form>
  );
}
