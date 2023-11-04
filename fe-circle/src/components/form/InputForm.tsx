import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  type InputProps,
} from '@chakra-ui/react';

interface InputFormProps extends React.ComponentProps<'input'> {
  label: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  (props, ref) => {
    return (
      <FormControl color="suits.primary">
        <FormLabel
          htmlFor={props.name}
          color="suits.secondary"
          fontSize="14px"
        >
          {props.label}
        </FormLabel>
        <Input
          {...(props as InputProps)}
          ref={ref}
          p={6}
          borderColor="suits.secondary"
          _focusVisible={{ borderColor: 'brands.primary' }}
          _hover={{
            borderColor: 'brands.primary',
            borderWidth: '1.5px',
          }}
          _placeholder={{ fontSize: '12px', color: 'suits.tertiary' }}
        />
      </FormControl>
    );
  }
);

InputForm.displayName = 'FormInput';

export default InputForm;
