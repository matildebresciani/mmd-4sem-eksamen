import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

type Props = {
    label: string;
    name: string;
    placeholder?: string;
    isRequired?: boolean;
};

const Textarea = ({ label, name, placeholder, isRequired }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <textarea
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

export default Textarea;
