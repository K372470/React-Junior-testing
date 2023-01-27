import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

type initialValue = { title: string; body?: string };

export const CustomForm: React.FC<{
  onSubmit: (values: initialValue) => void | Promise<any>;
  initialValues: initialValue;
}> = ({ initialValues, onSubmit }) => {
  const [isReadOnly, setReadMode] = useState<boolean>(true);

  return (
    <Box padding="10px" margin="10px" overflow="hidden" borderWidth="2px" borderRadius="lg" borderColor={isReadOnly ? 'cyan.300' : 'red.200'}>
      <Button
        h="30px"
        onClick={() => setReadMode(!isReadOnly)}
        float="right"
        outlineColor="red.200"
        variant="outline"
        rightIcon={<EditIcon color="green.300" />}
      >
        Enter Edit Mode
      </Button>
      <Heading>Data</Heading>
      <Formik
        onSubmit={v => {
          setReadMode(true);
          return onSubmit(v);
        }}
        initialValues={initialValues}
      >
        {props => (
          <Form>
            <Field name="title">
              {({ field }) => (
                <FormControl mt={4}>
                  <FormLabel>Title: </FormLabel>
                  <Input {...field} fontSize="3xl" readOnly={isReadOnly} />
                </FormControl>
              )}
            </Field>
            {props.values.body && (
              <Field name="body">
                {({ field }) => (
                  <FormControl mt={4}>
                    <FormLabel>Body: </FormLabel>
                    <Textarea type {...field} height="200px" resize="none" readOnly={isReadOnly} />
                  </FormControl>
                )}
              </Field>
            )}
            <Button
              mt={4}
              isLoading={isReadOnly}
              spinner={<BeatLoader size={8} color="white" />}
              colorScheme="teal"
              loadingText="Edit mode disabled"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
