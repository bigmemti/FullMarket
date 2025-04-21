import { ChangeEventHandler, InputHTMLAttributes } from "react";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import InputError from "./input-error"

interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, onSubmit }: FormProps) {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}

interface FormContainerProps {
    children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
    return (
        <div className="w-lg mx-auto mt-12">
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
}

function TextInput({ label, name, value, onChange, errors }: TextInputProps) {
    return (
        <div>
            <Label htmlFor={name} >{label}</Label>
            <Input
                id={name}
                value={value}
                onChange={onChange}
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


export { TextInput, FileInput, Form, FormContainer, ProgressBar }