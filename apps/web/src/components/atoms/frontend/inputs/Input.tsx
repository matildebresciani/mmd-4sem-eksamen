import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

type Props = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    isRequired?: boolean;
};

const Input = ({ label, name, type, placeholder, isRequired }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <input
                type={type}
                {...register(name, { required: isRequired })}
                placeholder={placeholder}
                id={id}
                className="p-theme-md border border-theme-border-base bg-theme-border-subtle rounded-theme-button focus:border-theme-border-strong"
                aria-invalid={!!error}
                aria-errormessage={error ? errorId : undefined}
            />
        </FieldBase>
    );
};

export default Input;
