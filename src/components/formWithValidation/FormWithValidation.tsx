import { Square, SquareCheck } from "lucide-react";
import "./formWithValidation.scss";
import { useState } from "react";

type Field = "name" | "email" | "message" | "acceptRules";

type ValidationRules = Record<Field, RegExp>;

interface FormWithValidationProps {
    validationRules: ValidationRules;
}

export const FormWithValidation = ({
    validationRules,
}: FormWithValidationProps) => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
        acceptRules: false,
    });

    const [errors, setErrors] = useState<Record<Field, boolean>>({
        name: true,
        email: true,
        message: true,
        acceptRules: true,
    });

    const [wasAcceptTouched, setWasAcceptTouched] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const validateField = (field: Field, value: string | boolean): boolean => {
        if (field === "acceptRules") {
            return value === true;
        }
        const rule = validationRules[field];
        return rule.test(String(value).trim());
    };

    const update = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;

        const field = name as Field;

        const isValid = validateField(field, value);

        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: isValid,
        }));
    };

    const updateAccept = () => {
        setFormState((prev) => ({
            ...prev,
            acceptRules: !prev.acceptRules,
        }));
        setWasAcceptTouched(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedErrors: Record<Field, boolean> = {
            name: validateField("name", formState.name),
            email: validateField("email", formState.email),
            message: validateField("message", formState.message),
            acceptRules: formState.acceptRules,
        };

        setErrors(updatedErrors);
        setWasSubmitted(true);

        const isFormValid = Object.values(updatedErrors).every(Boolean);
        if (!isFormValid) return;

        console.log("✅ Отправка формы:", formState);
        alert("✅ Отправка формы:\n" + JSON.stringify(formState, null, 2));

        setFormState({
            name: "",
            email: "",
            message: "",
            acceptRules: false,
        });

        setErrors({
            name: true,
            email: true,
            message: true,
            acceptRules: true,
        });

        setWasSubmitted(false); // сбрасываем флаг после успешной отправки
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__header">
                <h2>Get in touch with the form below!</h2>
                <p>And let`s get to work!</p>
            </div>

            <div className="form__container">
                <div className="form__container--inputs">
                    <input
                        className={
                            !errors.name && wasSubmitted ? "invalid" : ""
                        }
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={update}
                        required
                    />
                    <input
                        className={
                            !errors.email && wasSubmitted ? "invalid" : ""
                        }
                        type="text"
                        name="email"
                        placeholder="Your email"
                        value={formState.email}
                        onChange={update}
                        required
                    />
                </div>
                <textarea
                    className={!errors.message && wasSubmitted ? "invalid" : ""}
                    name="message"
                    placeholder="Your message"
                    value={formState.message}
                    onChange={update}
                    required
                />
            </div>

            <div
                className={`form__accept ${
                    !formState.acceptRules && wasAcceptTouched && wasSubmitted
                        ? "invalid"
                        : ""
                }`}
            >
                {formState.acceptRules ? (
                    <SquareCheck
                        color="black"
                        className="form__accept--btn"
                        onClick={updateAccept}
                    />
                ) : (
                    <Square
                        className="form__accept--btn"
                        onClick={updateAccept}
                    />
                )}
                <p>
                    Please accept our <a href="#">terms and conditions</a>
                </p>
            </div>

            <button
                type="submit"
                className="form__submit-btn"
                disabled={!formState.acceptRules}
            >
                Submit
            </button>
        </form>
    );
};
