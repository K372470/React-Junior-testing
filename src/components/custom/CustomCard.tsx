import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardFooter, Heading, ButtonGroup, Divider, Center } from '@chakra-ui/react';
import React from 'react';

export const CustomCard: React.FC<{ onDeleteClick: VoidFunction; detailsClick?: VoidFunction; children; title }> = ({
  children: body,
  detailsClick,
  onDeleteClick,
  title,
}) => {
  const onDeleteButtonClick = () => {
    if (confirm('You Will delete 1 file\n You sure?')) {
      return onDeleteClick();
    }
  };

  return (
    <Card className="post" variant="outline" display="flex" borderWidth="3px">
      <CardBody h="300px">
        <Heading size="md" margin="10px" h="80px">
          {title}
          <Center>
            <Divider variant="dashed" borderColor="blue.200" w="150px" margin="5px" borderWidth="2px" />
          </Center>
        </Heading>
        {body}
      </CardBody>

      <Divider />
      <CardFooter justifyContent="flex-end" marginBottom="0" marginTop="initial">
        <ButtonGroup justifyContent="space-evenly" alignItems="center" padding="5px">
          <Button variant="outline" onClick={onDeleteButtonClick} leftIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="solid" onClick={detailsClick} colorScheme="gray">
            Show Details
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
