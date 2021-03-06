/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import App from '../../client/components/App';
import SearchFieldsWithData from '../../client/containers/SearchFields';
import SearchAdvancedWithData from '../../client/containers/SearchAdvanced';
import SearchButton from '../../client/components/SearchButton';
import RouteListNonstop from '../../client/containers/RouteListNonstop';
import RouteListMultiStop from '../../client/containers/RouteListMultiStop';

describe('<App />', () => {
  let wrapper;
  const query = {
    sourceAirport: 'SMF',
    destinationAirport: 'CDG',
    advancedOptions: {
      nonstop: true,
      airline: 'AA',
    },
  };
  const client = new ApolloClient();
  const wrapWithProvider = component => (
    <ApolloProvider client={client}>{component}</ApolloProvider>
  );

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  // RENDERS CHILD COMPONENTS
  it('shows the title of the page as an h1', () => {
    expect(wrapper.find('h1')).to.exist;
    expect(wrapper.find('h1')).to.have.id('site-title');
  });

  it('shows a description of the page as an h2', () => {
    expect(wrapper.find('h2')).to.exist;
    expect(wrapper.find('h2')).to.have.id('site-description');
  });

  it('shows a <SearchFields /> component', () => {
    expect(wrapper.find(SearchFieldsWithData)).to.have.length(1);
  });

  it('shows a <SearchAdvanced /> component', () => {
    expect(wrapper.find(SearchAdvancedWithData)).to.have.length(1);
  });

  it('shows a <SearchButton /> component', () => {
    expect(wrapper.find(SearchButton)).to.have.length(1);
  });

  it('shows an error message if one exists', () => {
    wrapper.setState({ errorMessage: 'Error' });
    expect(wrapper.find('.error')).to.have.length(1);
  });

  // INITIALIZES THE STATE
  context('state', () => {
    it('starts with an empty sourceAirport', () => {
      expect(wrapper.state('sourceAirport')).to.eql('');
    });

    it('starts with an empty destinationAirport', () => {
      expect(wrapper.state('destinationAirport')).to.eql('');
    });

    it('starts with an empty advancedOptions', () => {
      const advancedOptions = {
        airline: '',
        nonstop: false,
        isAirlineValid: true,
      };
      expect(wrapper.state('advancedOptions')).to.eql(advancedOptions);
    });

    it('starts with an empty query', () => {
      expect(wrapper.state('query')).to.eql({});
    });

    it('starts with an empty errorMessage', () => {
      expect(wrapper.state('errorMessage')).to.eql('');
    });
  });

  // UPDATES THE STATE
  context('event handlers', () => {
    it('adds sourceAirport to state', () => {
      wrapper.instance().handleSourceAirportInput({ sourceAirport: 'SMF' });
      expect(wrapper.state('sourceAirport')).to.eql('SMF');
    });

    it('adds destinationAirport to state', () => {
      wrapper.instance().handleDestinationAirportInput({ destinationAirport: 'SMF' });
      expect(wrapper.state('destinationAirport')).to.eql('SMF');
    });

    it('adds advancedOptions to state', () => {
      wrapper.instance().handleAdvancedOptionsInput({ airline: 'UA' });
      expect(wrapper.state('advancedOptions')).to.eql({ airline: 'UA' });
    });

    it('adds error to errorMessage state', () => {
      wrapper.instance().handleErrorMessage('Error');
      expect(wrapper.state('errorMessage').length).to.be.greaterThan(0);
    });
  });

  // SENDS PROPS TO COMPONENTS
  context('sends the correct props to <SearchFields />', () => {
    it('passes handleSourceAirportInput function', () => {
      const searchFields = wrapper.find(SearchFieldsWithData);
      const handleSourceAirportInput = wrapper.instance().handleSourceAirportInput;
      expect(searchFields.prop('onSourceAirportInput')).to.eql(handleSourceAirportInput);
    });

    it('passes handleDestinationAirportInput function', () => {
      const searchFields = wrapper.find(SearchFieldsWithData);
      const handleDestinationAirportInput = wrapper.instance().handleDestinationAirportInput;
      expect(searchFields.prop('onDestinationAirportInput')).to.eql(handleDestinationAirportInput);
    });
  });

  context('sends the correct props to <SearchAdvanced />', () => {
    it('passes handleAdvancedOptionsInput function', () => {
      const searchAdvanced = wrapper.find(SearchAdvancedWithData);
      const handleAdvancedOptionsInput = wrapper.instance().handleAdvancedOptionsInput;
      expect(searchAdvanced.prop('onAdvancedOptionsInput')).to.eql(handleAdvancedOptionsInput);
    });
  });

  context('sends the correct props to <SearchButton />', () => {
    it('passes fetchRoute function', () => {
      const searchButton = wrapper.find(SearchButton);
      const createQuery = wrapper.instance().createQuery;
      expect(searchButton.prop('onSubmit')).to.eql(createQuery);
    });
  });

  context('sends the correct props to <RouteListNonstop />', () => {
    it('passes handleErrorMessage function', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({ query });
      const routeListNonstop = wrapper.find(RouteListNonstop);
      const handleErrorMessage = wrapper.instance().handleErrorMessage;
      expect(routeListNonstop.prop('onErrorMessage')).to.eql(handleErrorMessage);
    });

    it('passes airline only if it exists', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({
        query: {
          sourceAirport: 'SMF',
          destinationAirport: 'CDG',
          advancedOptions: {
            nonstop: true,
            airline: '',
          },
        },
      });
      let routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('airline')).to.be.undefined;
      wrapper.setState({
        query: {
          sourceAirport: 'SMF',
          destinationAirport: 'CDG',
          advancedOptions: {
            nonstop: true,
            airline: 'AA',
          },
        },
      });
      routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('airline')).to.equal('AA');
    });

    it('passes sourceAirport only if it exists', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({
        query: {
          sourceAirport: '',
          destinationAirport: 'CDG',
          advancedOptions: {
            nonstop: true,
            airline: '',
          },
        },
      });
      let routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('sourceAirport')).to.be.undefined;
      wrapper.setState({
        query: {
          sourceAirport: 'SMF',
          destinationAirport: 'CDG',
          advancedOptions: {
            nonstop: true,
            airline: 'AA',
          },
        },
      });
      routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('sourceAirport')).to.equal('SMF');
    });

    it('passes destinationAirport only if it exists', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({
        query: {
          sourceAirport: 'SMF',
          destinationAirport: '',
          advancedOptions: {
            nonstop: true,
            airline: '',
          },
        },
      });
      let routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('destinationAirport')).to.be.undefined;
      wrapper.setState({
        query: {
          sourceAirport: 'SMF',
          destinationAirport: 'CDG',
          advancedOptions: {
            nonstop: true,
            airline: 'AA',
          },
        },
      });
      routeListNonstop = wrapper.find(RouteListNonstop);
      expect(routeListNonstop.prop('destinationAirport')).to.equal('CDG');
    });
  });

  // FUNCTION LOGIC
  context('createQuery function', () => {
    it('adds error to errorMessage if no source or destination airport provided', () => {
      wrapper.instance().createQuery();
      expect(wrapper.state('errorMessage').length).to.be.greaterThan(0);
    });

    it('adds error to errorMessage if the source and destination are the same', () => {
      wrapper.setState({
        sourceAirport: 'SMF',
        destinationAirport: 'SMF',
      });
      wrapper.instance().createQuery();
      expect(wrapper.state('errorMessage').length).to.be.greaterThan(0);
    });

    it('adds error to errorMessage if not nonstop, but there is not a source AND destination set', () => {
      wrapper.setState({
        sourceAirport: 'SMF',
        destinationAirport: '',
      });
      wrapper.instance().createQuery();
      expect(wrapper.state('errorMessage').length).to.be.greaterThan(0);
    });

    it('adds error to errorMessage if not nonstop, but airline isn\'t set', () => {
      wrapper.setState({
        sourceAirport: 'SMF',
        destinationAirport: 'CDG',
        advancedOptions: {
          nonstop: false,
        },
      });
      wrapper.instance().createQuery();
      expect(wrapper.state('errorMessage').length).to.be.greaterThan(0);
      wrapper.setState({
        sourceAirport: 'SMF',
        destinationAirport: 'CDG',
        advancedOptions: {
          nonstop: false,
          airline: 'UA',
          isAirlineValid: true,
        },
        errorMessage: '',
      });
      wrapper.instance().createQuery();
      expect(wrapper.state('errorMessage').length).to.equal(0);
    });

    it('sets query in components state', () => {
      wrapper.setState({
        sourceAirport: 'SMF',
        destinationAirport: 'CDG',
        advancedOptions: {
          nonstop: true,
          airline: '',
          isAirlineValid: true,
        },
      });
      wrapper.instance().createQuery();
      const queryExpected = {
        sourceAirport: 'SMF',
        destinationAirport: 'CDG',
        advancedOptions: {
          nonstop: true,
          airline: '',
        },
      };
      expect(wrapper.state('query')).to.eql(queryExpected);
    });
  });

  context('renderRouteList function', () => {
    it('doesn\'t show any <RouteList... /> components if there isn\'t a query', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      expect(wrapper.find(RouteListNonstop)).to.have.length(0);
    });

    it('returns <RouteListNonstop /> if query nonstop is true', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({ query });
      expect(wrapper.find(RouteListNonstop)).to.have.length(1);
    });

    it('returns <RouteListMultiStop /> if nonstop is false', () => {
      wrapper = shallow(wrapWithProvider(<App />)).shallow();
      wrapper.setState({ query: {
        sourceAirport: 'SMF',
        destinationAirport: 'CDG',
        advancedOptions: {
          nonstop: false,
          airline: 'all',
        },
      } });
      expect(wrapper.find(RouteListMultiStop)).to.have.length(1);
    });
  });
});
