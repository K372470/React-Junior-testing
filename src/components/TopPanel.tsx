import { ArrowBackIcon, SunIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Divider, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ColorSwitcher: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} rightIcon={<SunIcon />}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};

export const TopPanel = () => {
  const navigate = useNavigate();
  const backToPreviousPage = () => navigate(-1);
  return (
    <header>
      <ButtonGroup display="flex" fontSize="3xl" justifyContent="space-evenly" alignItems="center" padding="5px">
        <Button variant="outline" onClick={backToPreviousPage} leftIcon={<ArrowBackIcon />}>
          Go Back
        </Button>

        <Button as={NavLink} color="teal.300" to="/" size="md">
          Home
        </Button>

        <Button as={NavLink} color="teal.300" to="/posts" size="md">
          Posts
        </Button>

        <Button as={NavLink} color="teal.300" to="/albums" size="md">
          Albums
        </Button>

        <Button as={NavLink} color="teal.300" to="/todo" size="md">
          Tasks
        </Button>

        <ColorSwitcher />
      </ButtonGroup>
      <Divider h="2px" width="100%" marginBottom="5px" background="black" />
    </header>
  );
};
