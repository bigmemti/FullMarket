import { ChangeEventHandler, InputHTMLAttributes, MouseEventHandler } from "react";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import InputError from "./input-error"
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, onSubmit }: FormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {children}
        </form>
    )
}

interface FormContainerProps {
    children: React.ReactNode;
    className?: string;
}

function FormContainer({ children, className }: FormContainerProps) {
    return (
        <div className={`w-lg mx-auto mt-12 ${className}`}>
            {children}
        </div>
    )
}

interface TextInputProps {
    label: string;
    name: string;
    value: InputHTMLAttributes<HTMLInputElement>['value'];
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    errors: string | undefined | null;
    disabled?: boolean;
    autoFocus?: boolean;
}

function TextInput({ label, name, value, onChange, errors, disabled, autoFocus }: TextInputProps) {
    return (
        <div>
            <Label htmlFor={name} >{label}</Label>
            <Input
                id={name}
                value={value}
                onChange={onChange}
                className="mt-1"
                disabled={disabled}
                autoFocus={autoFocus}
            />
            {errors && (
                <InputError message={errors} />
            )}
        </div>
    )
}

interface FileInputProps {
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    errors: string | undefined | null;
}

function FileInput({ label, name, onChange, errors }: FileInputProps) {
    return (
        <div>
            <Label htmlFor={name} >{label}</Label>
            <Input
                id={name}
                type="file"
                onChange={onChange}
                className="mt-1"
            />
            {errors && (
                <InputError message={errors} />
            )}
        </div>
    )
}

function ProgressBar({ progress }: { progress: number }) {
    return (
        <progress className="w-full mt-2 rounded-lg" value={progress} max="100">
            {progress}%
        </progress>
    )
}

interface CheckboxInputProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: MouseEventHandler<HTMLButtonElement>;
}

function CheckboxInput({ label, name, checked, onChange }: CheckboxInputProps) {
    return (
        <div className="flex items-center space-x-3">
            <Checkbox id={name} name={name} checked={checked} onClick={onChange} />
            <Label htmlFor={name}>{label}</Label>    
        </div>
    )
}

interface SelectInputProps {
    label: string;
    name: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    errors: string | undefined | null;
    value: string;
    disabled?: boolean;
}

function SelectInput({ label, name, onChange, options, errors, value, disabled }: SelectInputProps) {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Select disabled={disabled} defaultValue={value} onValueChange={onChange}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value=" ">None</SelectItem>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors && <InputError message={errors} />}
        </div>
    )
}



export { TextInput, FileInput, Form, FormContainer, ProgressBar, CheckboxInput, SelectInput }