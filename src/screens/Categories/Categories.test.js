import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { UnwrappedCategories as Categories } from './Categories';
import ListItem from '../../components/ListItem/ListItem';
jest.mock('../../components/ListItem/ListItem', () => '<ListItem />')

describe('test Categories', () => {
  const props = {
    categories: [{
      strCategory: 'mock_category'
    }],
    retrieveCategories: jest.fn(), 
    retrieveMeal: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  const createShallowRenderer = (passedProps = {}) => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<Categories {...props} {...passedProps} />);
    return shallowRenderer.getRenderOutput();
  };

  const createTestRendererInstance = (passedProps = {}) => {
    return TestRenderer.create(<Categories {...props} {...passedProps} />).getInstance();
  };

  let renderOutput;
  let testRendererInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    renderOutput = createShallowRenderer();
    testRendererInstance = createTestRendererInstance();
  });

  describe('test rendered output', () => {
    it('should render list element', () => {
      expect(renderOutput.type).toBe('ul');
      expect(renderOutput.props.children.length).toEqual(props.categories.length);
    });
  });

  describe('test functional output', () => {
    it('should call retrieveCategories when component mounts', () => {
      testRendererInstance.render();
      expect(props.retrieveCategories).toBeCalled();
    });

    it('should render ListItem', () => {
      const listItem = testRendererInstance.renderItem({});
      expect(listItem.type).toBe(ListItem);
    });

    it('should call retrieveMeal and navigate', () => {
      const mockKey = 'mock_key';
      testRendererInstance.getMeals(mockKey);
      expect(props.retrieveMeal).toBeCalledWith(mockKey);
      expect(props.history.push).toBeCalledWith("/Meals/" + mockKey);
    });
  })
})
