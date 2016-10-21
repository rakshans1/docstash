import React, {PropTypes} from 'react';
import _ from '../utils/lobash'
import Icon from './icon';
import InputError from './InputErrors';
import PasswordValidator from './PasswordValidator';

import classNames from 'classnames';

class Input extends React.Component {
    constructor(props) {
        super(props);
        let valid = (this.props.isvalid && this.props.isvalid()) || true;
        this.state = {
            valid: valid,
            empty: _.isEmpty(this.props.value),
            focus: false,
            value: '',
            iconsVisible: !this.props.validator,
            errorMessage: this.props.emptyMessage,
            validator: this.props.validator,
            validatorVisible: false,
            type: this.props.type,
            minCharacters: this.props.minCharacters,
            requireCapitals: this.props.requireCapitals,
            requireNumbers: this.props.requireNumbers,
            forbiddenWords: this.props.forbiddenWords,
            isValidatorValid: {
                minChars: false,
                capitalLetters: false,
                numbers: false,
                words: false,
                all: false
            },
            allValidatorValid: false
        };
        this.mouseEnterError = this.mouseEnterError.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.checkRules = this.checkRules.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.value) {
            if (!_.isUndefined(newProps.value) && newProps.value.length > 0) {
                if (this.props.validate) {
                    this.validateInput(newProps.value);
                }
                this.setState({
                    value: newProps.value,
                    empty: _.isEmpty(newProps.value)
                });
            }
        }
    }
    validateInput(value) {
        if (this.props.validate && this.props.validate(value)) {
            this.setState({valid: true, errorvisible: false});
        } else {
            this.setState({
                valid: false,
                errorMessage: !_.isEmpty(value)
                    ? this.props.errorMessage
                    : this.props.emptyMessage
            });
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            empty: _.isEmpty(event.target.value)
        });

        if (this.props.validator) {
            this.checkRules(event.target.value);
        }

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    isValid() {
        if (this.props.validate) {
            if (_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
                this.setState({valid: false, errorVisible: true});
            }
        }

        return this.state.valid;
    }

    handleFocus() {
        this.setState({focus: true, validatorVisible: true});

        if (this.props.validator) {
            this.setState({errorVisible: false});
        }
    }

    handleBlur() {
        this.setState({
            focus: false,
            errorVisible: !this.state.valid,
            validatorVisible: false
        });
    }

    mouseEnterError() {
        this.setState({errorVisible: true});
    }

    hideError() {
        this.setState({errorVisible: false, validatorVisible: false});
    }

    checkRules(value) {
        let validData = {
            minChars: !_.isEmpty(value)
                ? value.length >= parseInt(this.state.minCharacters)
                : false,
            capitalLetters: !_.isEmpty(value)
                ? this.countCapitals(value)
                : false,
            numbers: !_.isEmpty(value)
                ? this.countNumbers(value) > 0
                : false,
            words: !_.isEmpty(value)
                ? !this.checkWords(value)
                : false
        };
        let allValid = (validData.minChars && validData.capitalLetters && validData.numbers && validData.words);

        this.setState({isValidatorValid: validData, allValidatorValid: allValid, valid: allValid});
    }

    countCapitals(value) {
        let str = value;
        return str.replace(/[^A-Z]/g, "").length;
    }

    countNumbers(value) {
        return /\d/.test(value);
    }
    checkWords(value) {
        return this.state.forbiddenWords.some(function(word) {
            let matched = (word === value)
                ? true
                : "";
            return matched;
        });
    }

    render() {
        let inputGroupClasses = classNames({
            'input_group': true,
            'input_valid': this.state.valid,
            'input_error': !this.state.valid,
            'input_empty': this.state.empty,
            'input_hasValue': !this.state.empty,
            'input_focused': this.state.focus,
            'input_unfocused': !this.state.focus
        });

        let validator;
        if (this.state.validator) {
            validator = <PasswordValidator ref="passwordValidator" visible={this.state.validatorVisible} name={this.props.text} value={this.state.value} validData={this.state.isValidatorValid} valid={this.state.allValidatorValid} forbiddenWords={this.state.forbiddenWords} minCharacters={this.props.minCharacters} requireCapitals={this.props.requireCapitals} requireNumbers={this.props.requireNumbers}/>;
        }

        return (
            <div className={inputGroupClasses}>
                <label className="input_label" htmlFor={this.props.text}>
                    <span className="label_text">{this.props.text}</span>
                </label>
                <input // {...this.props}
                    placeholder={this.props.placeholder} className="input" id={this.props.text} defaultValue={this.props.defaultValue} value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} autoComplete="off" type={this.props.type}/>
                <InputError visible={this.state.errorVisible} errorMessage={this.state.errorMessage}/>
                <div className="validationIcons">
                    <i className="input_error_icon" onMouseEnter={this.mouseEnterError}>
                        <Icon type="circle_error"/>
                    </i>
                    <i className="input_valid_icon">
                        <Icon type="circle_tick"/>
                    </i>
                </div>
                {validator}
            </div>
        );
    }
}
Input.propTypes = {
    isvalid: PropTypes.bool,
    value: PropTypes.string,
    validator: PropTypes.string,
    emptyMessage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    minCharacters: PropTypes.string,
    requireCapitals: PropTypes.string,
    requireNumbers: PropTypes.string,
    forbiddenWords: PropTypes.array,
    handleChange: PropTypes.bool,
    defaultValue: PropTypes.string,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validate: PropTypes.func,
    errorMessage: PropTypes.string,
    onchange: PropTypes.bool,
    onChange: PropTypes.func
};
export default Input;
