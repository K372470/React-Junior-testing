import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Data } from '../../types';

export const CustomEditableContent: React.FC<{
  onSubmit;
  onClose;
  initialValues: Data.CombinedProperty;
  isOpen;
}> = ({ onSubmit, onClose, initialValues, isOpen }) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fill new data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            {props => (
              <Form>
                {Object.entries(props.values)
                  .filter(([key]) => !key.toLowerCase().includes('id'))
                  .map(
                    ([key, value]) =>
                      value && (
                        <Field name={key}>
                          {({ field }) => (
                            <FormControl>
                              <FormLabel>{key}</FormLabel>
                              {value.length > 50 ? <Textarea minH={'80px'} {...field} /> : <Input {...field} />}
                            </FormControl>
                          )}
                        </Field>
                      )
                  )}
                <Divider margin="20px" />
                <Button mt={4} margin="10px" colorScheme="teal" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
