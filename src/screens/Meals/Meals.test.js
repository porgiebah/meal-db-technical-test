import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { UnwrappedMeals as Meals } from './Meals';
import ListItem from '../../components/ListItem/ListItem';
jest.mock('../../components/ListItem/ListItem', () => '<ListItem />')

describe('test Meals', () => {
  const props = {
    categories: [{}],
    meals: [{
        idMeal: 'mock_id'
    }],
    retrieveRecipe: jest.fn(), 
    history: {
      push: jest.fn(),
    },
  };

  const createShallowRenderer = (passedProps = {}) => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<Meals {...props} {...passedProps} />);
    return shallowRenderer.getRenderOutput();
  };

  const createTestRendererInstance = (passedProps = {}) => {
    return TestRenderer.create(<Meals {...props} {...passedProps} />).getInstance();
  };

  let renderOutput;
  let testRendererInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    renderOutput = createShallowRenderer();
    testRendererInstance = createTestRendererInstance();
  });

  describe('test rendered output', () => {
    it('should not render if meals is not defined', () => {
      renderOutput = createShallowRenderer({ meals: null });
      expect(renderOutput).toBe(null);
    });
    
    it('should render list element', () => {
      expect(renderOutput.type).toBe('ul');
      expect(renderOutput.props.children.length).toEqual(props.meals.length);
    });
  });

  describe('test functional output', () => {
    it('should redirect to root page if categories is not populated', () => {
      testRendererInstance = createTestRendererInstance({ categories: [] });
      testRendererInstance.render();
      expect(props.history.push).toBeCalledWith('/');
    });

    it('should render ListItem', () => {
      const listItem = testRendererInstance.renderItem({});
      expect(listItem.type).toBe(ListItem);
    });

    it('should call getMeals', () => {
      const mockId = 'mock_id';
      testRendererInstance.getRecipe(mockId);
      expect(props.retrieveRecipe).toBeCalledWith(mockId);
      expect(props.history.push).toBeCalledWith("/Recipe/" + mockId);

    });
  })
})
