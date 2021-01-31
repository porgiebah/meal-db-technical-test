import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactMarkdown from "react-markdown";
import { UnwrappedRecipe as Recipe } from './Recipe';

describe('test Recipe', () => {
  const props = {
    meals: {
        idMeal: '123',
    },
    recipe: {},
    history: {
      push: jest.fn(),
    },
  };

  const createShallowRenderer = (passedProps = {}) => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<Recipe {...props} {...passedProps} />);
    return shallowRenderer.getRenderOutput();
  };

  const createTestRendererInstance = (passedProps = {}) => {
    return TestRenderer.create(<Recipe {...props} {...passedProps} />).getInstance();
  };

  let renderOutput;
  let testRendererInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    renderOutput = createShallowRenderer();
    testRendererInstance = createTestRendererInstance();
  });

  describe('test rendered output', () => {
    it('should not render if recipe is not defined', () => {
      renderOutput = createShallowRenderer({ recipe: null });
      expect(renderOutput).toBe(null);
    });

    it('should render div containers', () => {
      expect(renderOutput.type).toBe('div');

      const [leftColumn, rightColumn] = renderOutput.props.children;
      expect(leftColumn.type).toBe('div');
      expect(rightColumn.type).toBe('div');
    });
  });

  describe('test functional output', () => {
    it('should redirect to root page if meals is not populated', () => {
      testRendererInstance = createTestRendererInstance({ meals: {} });
      testRendererInstance.render();
      expect(props.history.push).toBeCalledWith('/');
    });

    describe('test left column output', () => {
        it('should render image', () => {
            const leftColumn = testRendererInstance.renderLeftColumn('mock_image_url', 'mock_youtube_url', 'mock_recipe_url');
            expect(leftColumn.type).toBe('div');

            const [image, hyperlinkContainer] = leftColumn.props.children;
            expect(image.type).toBe('img');
            expect(hyperlinkContainer.type).toBe('div');
        });
    
        describe('test hyperlink render', () => {
            it('should render hyperlinks', () => {
                const leftColumn = testRendererInstance.renderLeftColumn('mock_image_url', 'mock_youtube_url', 'mock_recipe_url');
                const [, hyperlinkContainer] = leftColumn.props.children;
                const [youtubeLink, recipeLink] = hyperlinkContainer.props.children;
                expect(youtubeLink.type).toBe('a');
                expect(recipeLink.type).toBe('a');
            });
    
            it('should not render hyperlinks', () => {
                const leftColumn = testRendererInstance.renderLeftColumn('mock_image_url', null, null);
                const [, hyperlinkContainer] = leftColumn.props.children;
                const [youtubeLink, recipeLink] = hyperlinkContainer.props.children;
                expect(youtubeLink).toBe(null);
                expect(recipeLink).toBe(null);
            });
        });
    });

    describe('test right column output', () => {
        it('should render headers and correct page contents', () => {
            const rightColumn = testRendererInstance.renderRightColumn('mock_meal_title', 'mock_meal_instructions', {});
            expect(rightColumn.type).toBe('div');

            const [mealString, instructionHeader, markDownComponent, ingredientHeader] = rightColumn.props.children;
            expect(mealString.type).toBe('h1');
            expect(instructionHeader.type).toBe('h2');
            expect(markDownComponent.type).toBe(ReactMarkdown);
            expect(ingredientHeader.type).toBe('h2');
        });

        it('should render correct number of measurements and ingredients', () => {
            const mockRecipe = {
                strMeasure1: "mock_measure1",
                strMeasure2: "mock_measure2",
                strIngredient1: "mock_ingredient1",
                strIngredient2: "mock_ingredient2",
            };
            const ingredients = testRendererInstance.renderIngredients(mockRecipe);
            expect(ingredients.length).toEqual(2);
        });
    });
  })
})
