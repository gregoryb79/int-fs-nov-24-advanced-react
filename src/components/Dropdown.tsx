import { createContext, useContext, useState, type PropsWithChildren } from "react";

const dropdownContext = createContext<{
    setValue(value: string): void,
} | undefined>(undefined);

type DropdownProps = {
    id: string,
    name: string,
};

export function Dropdown({ id, name, children }: PropsWithChildren<DropdownProps>) {
    const [value, setValue] = useState("omer");

    return (
        <>
            <input type="hidden" name={name} value={value} id={id} />
            <details>
                <summary role="combobox">{value}</summary>
                <div role="listbox">
                    <dropdownContext.Provider value={{ setValue }}>
                        {children}
                    </dropdownContext.Provider>
                </div>
            </details>
        </>
    );
}

type OptionProps = {
    value: string,
};

export function Option({ value, children }: PropsWithChildren<OptionProps>) {
    const context = useContext(dropdownContext);

    if (!context) {
        throw new Error("Can't use Option outside of Dropdown");
    }

    return (
        <div role="option" onClick={() => context.setValue(value)}>{children}</div>
    );
}
