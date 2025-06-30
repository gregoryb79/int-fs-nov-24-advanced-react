import React, { useEffect } from "react";
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import styles from "./Dropdown.module.scss";

const dropdownContext = createContext<{
    setValue(value: string): void,
} | undefined>(undefined);

type DropdownProps = {
    id: string,
    name: string,
};

export function Dropdown({ id, name, children }: PropsWithChildren<DropdownProps>) {

    const childrenArray = React.Children.toArray(children);
    const validChildren = childrenArray.filter((child,index): child is React.ReactElement<PropsWithChildren<OptionProps>> => {
         const isValid = React.isValidElement(child) && typeof child.props === 'object' && child.props !== null && 'value' in child.props;    
            if (!isValid) {
                console.warn(`Child at index ${index} is not a valid Option element`);
            }            
            return isValid;
        });

    const firstChild = validChildren[0];
    const [value, setValue] = useState("");
    
    useEffect(() => {        
            setValue((firstChild.props as OptionProps).value);               
    }, []);

    const [sectionToDisplay, setSectionToDisplay] = useState<React.ReactElement>();
    useEffect(() => {        

        const selectedChild = validChildren.find(child => (child.props as OptionProps).value === value);                   
        if (!selectedChild) {
            console.warn(`No Option found with value "${value}"`);            
            return;            
        }
        const childrenArray = React.Children.toArray(selectedChild.props.children);
        setSectionToDisplay(childrenArray[0] as React.ReactElement);       

    },[value]);

    const [showList, setShowList] = useState(false);

    return (
        <>
            <input type="hidden" name={name} value={value} id={id} />
            <section className={styles.dropDownMenu}>
                <section role="combobox" className={styles.dropdownSummary}>
                    {sectionToDisplay || value}
                    <button className={styles.dropdownButton} onClick={(e) => {
                        e.preventDefault();
                        setShowList(!showList);
                        }}>🔽</button>
                </section>
                {showList &&
                    <section role="listbox" className={styles.listbox}>
                    <dropdownContext.Provider value={{ setValue }}>
                        {children}
                    </dropdownContext.Provider>
                </section>}
            </section>
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
