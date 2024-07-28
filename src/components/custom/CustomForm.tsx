import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { capitalizeFirstLetter } from './utils';

export const CustomForm: React.FC<{
  onSubmit: (values: Object) => void | Promise<any>;
  initialValues: Object;
}> = ({ initialValues, onSubmit }) => {
  const [isReadOnly, setReadMode] = useState<boolean>(true);

  return (
    <Box
      padding="10px"
      margin="10px"
      overflow="hidden"
      borderWidth="2px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      borderColor={isReadOnly ? 'green.300' : 'red.200'}
    >
      <Button
        onClick={() => setReadMode(!isReadOnly)}
        float="right"
        variant="outline"
        margin="0,10px"
        rightIcon={<EditIcon color={isReadOnly ? 'green.300' : 'red.200'} />}
      >
        {isReadOnly ? 'Enter Edit Mode' : 'Exit Edit Mode'}
      </Button>
      <Formik
        onSubmit={v => {
          setReadMode(true);
          return onSubmit(v);
        }}
        initialValues={initialValues}
      >
        {props => (
          <Form>
            {Object.entries(props.values)
              .filter(([key]) => !key.toLowerCase().endsWith('id')) //id, userId etc
              .map(
                ([key, value]) =>
                  value && (
                    <Field name={key}>
                      {({ field }) => (
                        <FormControl marginBottom="25px">
                          <FormLabel>{capitalizeFirstLetter(key)}</FormLabel>
                          {value.length > 50 ? (
                            <Textarea minH="200px" {...field} readOnly={isReadOnly} />
                          ) : (
                            <Input {...field} readOnly={isReadOnly} />
                          )}
                        </FormControl>
                      )}
                    </Field>
                  )
              )}
            <Divider />
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
