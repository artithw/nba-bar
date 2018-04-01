import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import R from 'ramda';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import NavBar from '../../components/NavBar';
import { Spinner } from '../../components/Loader';
import { TeamScore, Table } from '../../components/Preview';

const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

class Preview extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.gameData);
  }

  render() {
    const {
      loading,
      gameData,
      date,
      homeTeamDashboardData,
      visitorTeamDashboardData,
    } = this.props;

    return (
      <Wrapper>
        <Fragment>
          <NavBar page="PREVIEW" />
          <DataSection>
            {loading && <Spinner />}
            {!loading && (
              <Fragment>
                <TeamScore
                  date={date}
                  time={gameData.periodTime.periodStatus}
                  arena={gameData.arena}
                  city={gameData.city}
                  home={{
                    name: gameData.home.abbreviation,
                    w: homeTeamDashboardData.w,
                    l: homeTeamDashboardData.l,
                  }}
                  visitor={{
                    name: gameData.visitor.abbreviation,
                    w: visitorTeamDashboardData.w,
                    l: visitorTeamDashboardData.l,
                  }}
                  gameStatus="Final"
                />
                <Table
                  home={homeTeamDashboardData}
                  visitor={visitorTeamDashboardData}
                />
              </Fragment>
            )}
          </DataSection>
        </Fragment>
      </Wrapper>
    );
  }
}

Preview.propTypes = {
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  homeTeamDashboardData: PropTypes.object.isRequired,
  visitorTeamDashboardData: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.preview.loading,
  gameData: R.find(R.propEq('id', ownProps.match.params.gameId))(
    state.home.scheduleData
  ),
  date: state.home.date,
  homeTeamDashboardData: state.preview.homeTeamDashboardData,
  visitorTeamDashboardData: state.preview.visitorTeamDashboardData,
});

export default connect(mapStateToProps, actions)(Preview);
