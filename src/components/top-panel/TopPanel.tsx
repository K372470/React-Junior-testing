import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Divider, SystemStyleObject, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopPanel.css';

const BUTTON_STYLE = 'ghost';
const BUTTON_COLOR = 'teal.300';
const ACTIVE_LINK_STYLE: SystemStyleObject = {
  fontWeight: 'bolder',
  textDecoration: 'underline'
};

export const TopPanel = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header style={{ marginBottom: '10px' }}>
      <ButtonGroup display="flex" fontSize="4xl" justifyContent="space-evenly" alignItems="center">
        <Button as={NavLink} variant={BUTTON_STYLE} to="/posts" color={BUTTON_COLOR} _activeLink={ACTIVE_LINK_STYLE}>
          Posts
        </Button>

        <Button as={NavLink} variant={BUTTON_STYLE} to="/albums" color={BUTTON_COLOR} _activeLink={ACTIVE_LINK_STYLE}>
          Albums
        </Button>

        <Button as={NavLink} variant={BUTTON_STYLE} to="/todo" color={BUTTON_COLOR} _activeLink={ACTIVE_LINK_STYLE}>
          Tasks
        </Button>

        <Button onClick={toggleColorMode} variant={BUTTON_STYLE}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </ButtonGroup>
      <Divider />
    </header>
  );
};
