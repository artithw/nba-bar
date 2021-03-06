import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavBar as AntdNavBar, Icon } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';

const Wrapper = styled.div`
  width: 100vw;
  height: 30px;
`;

const Title = styled.p`
  color: ${colors.white};
  font-size: 15px;
`;

const NavBar = ({ page }) => (
  <Wrapper>
    <AntdNavBar
      leftContent={
        <Link to="/" style={{ height: '100%' }}>
          <Icon
            type="left"
            color={colors.white}
            style={{
              position: 'absolute',
              left: '7px',
              height: '30px',
              cursor: 'pointer',
            }}
          />
        </Link>
      }
      style={{ height: '100%', background: colors.darkBlue }}
    >
      <Title>{page}</Title>
    </AntdNavBar>
  </Wrapper>
);

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NavBar;
