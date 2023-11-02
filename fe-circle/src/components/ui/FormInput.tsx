import * as React from 'react';
import {
  // chakra,
  FormControl,
  FormLabel,
  // HTMLChakraProps,
  Input,
  type InputProps,
  // type ThemingProps,
} from '@chakra-ui/react';

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
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

FormInput.displayName = 'FormInput';

export default FormInput;
