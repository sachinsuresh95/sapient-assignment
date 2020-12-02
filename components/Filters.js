import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const years = Array.from(new Array(15), (x, i) => `${i + 2006}`);

const Filters = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const { launch_year, launch_success, land_success } = router.query;
  const [yearFilter, setYearFilter] = useState(launch_year);
  const [launchSuccess, setLaunchSuccess] = useState(launch_success);
  const [landingSuccess, setLandingSuccess] = useState(land_success);
  const [filterVisible, setFilterVisible] = useState(true);
  const applyFilter = () => {
    const query = {};
    if (yearFilter?.length) {
      query.launch_year = yearFilter;
    }
    if (launchSuccess?.length) {
      query.launch_success = launchSuccess;
    }
    if (landingSuccess?.length) {
      query.land_success = landingSuccess;
    }
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  useEffect(() => {
    setFilterVisible(!isMobile);
  }, [isMobile]);
  useEffect(() => {
    applyFilter();
  }, [JSON.stringify(yearFilter), launchSuccess, landingSuccess]);
  return (
    <FilterContainer>
      <div className="filter-title">Filters</div>
      <button
        type="button"
        style={{ width: '100%' }}
        className="toggle-filter"
        onClick={() => {
          toggleFilterVisibility();
        }}
      >
        Click to show/hide filter
      </button>
      <div
        className={`filter-group-wrapper ${
          filterVisible ? 'visible' : 'hidden'
        }`}
      >
        <div className="filter-group">
          <div className="filter-title">Launch year</div>
          <div className="filters">
            {years.map(year => (
              <div key={year} className="filter-wrapper">
                <FilterToggle
                  value={year}
                  active={year === yearFilter}
                  onClick={e => {
                    e.preventDefault();
                    setYearFilter(year === yearFilter ? '' : year);
                  }}
                  tabIndex={isMobile ? (filterVisible ? '0' : '-1') : '0'}
                />
              </div>
            ))}
            <div className="dead-container filter-wrapper" />
          </div>
        </div>
        <div className="filter-group">
          <div className="filter-title">Launch Success</div>
          <div className="filters">
            <div className="filter-wrapper">
              <FilterToggle
                value="true"
                active={launchSuccess === 'true'}
                onClick={e => {
                  e.preventDefault();
                  setLaunchSuccess(launchSuccess === 'true' ? '' : 'true');
                }}
                tabIndex={isMobile ? (filterVisible ? '0' : '-1') : '0'}
              />
            </div>
            <div className="filter-wrapper">
              <FilterToggle
                value="false"
                active={launchSuccess === 'false'}
                onClick={e => {
                  e.preventDefault();
                  setLaunchSuccess(launchSuccess === 'false' ? '' : 'false');
                }}
                tabIndex={isMobile ? (filterVisible ? '0' : '-1') : '0'}
              />
            </div>
          </div>
        </div>
        <div className="filter-group">
          <div className="filter-title">Landing Success</div>
          <div className="filters">
            <div className="filter-wrapper">
              <FilterToggle
                value="true"
                active={landingSuccess === 'true'}
                onClick={e => {
                  e.preventDefault();
                  setLandingSuccess(landingSuccess === 'true' ? '' : 'true');
                }}
                tabIndex={isMobile ? (filterVisible ? '0' : '-1') : '0'}
              />
            </div>
            <div className="filter-wrapper">
              <FilterToggle
                value="false"
                active={landingSuccess === 'false'}
                onClick={e => {
                  e.preventDefault();
                  setLandingSuccess(landingSuccess === 'false' ? '' : 'false');
                }}
                tabIndex={isMobile ? (filterVisible ? '0' : '-1') : '0'}
              />
            </div>
          </div>
        </div>
      </div>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  padding: 10px;
  max-width: 220px;
  height: fit-content;
  margin: 10px auto;
  border-radius: 5px;
  background-color: white;
  .filter-title {
    font-weight: 600;
  }
  .toggle-filter {
    text-align: center;
  }
  .filter-group-wrapper {
    transition: height 1s;
    overflow: hidden;
    &.hidden {
      height: 0;
    }
    &.visible {
      height: 600px;
    }
  }
  .filter-group {
    .filter-title {
      text-decoration: underline;
      text-align: center;
      font-weight: normal;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .filter-wrapper {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
      }
    }
  }
  @media (min-width: 700px) {
    margin: 0 10px 0 0;
    .toggle-filter {
      display: none;
    }
  }
`;

const FilterButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#a3ba70' : '#e8f5cb')};
  cursor: pointer;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

const FilterToggle = ({ value, ...props }) => (
  <FilterButton {...props}>{value}</FilterButton>
);
export default Filters;
