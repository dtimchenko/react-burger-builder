import React from 'react';
import styles from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    
    const defineStyles = () => {
        let styleClasses = [styles.InputElement];

        if (props.invalid) {
            styleClasses.push(styles.Invalid);
        }
        return styleClasses;
    }

    const styleClasses = defineStyles().join(' ');

    switch (props.elementType) {
        case ('textarea'):
            inputElement = <textarea
                className={styleClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        case ('select'):
            inputElement = <select
                className={styleClasses}
                onChange={props.onChange}>
                {
                    props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.display}</option>
                    ))
                }
            </select>;
            break;
        default:
            inputElement = <input
                className={styleClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;