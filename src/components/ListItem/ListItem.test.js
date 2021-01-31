import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactMarkdown from "react-markdown";
import ListItem from './ListItem';

describe('test ListItem', () => {
  const props = {
    imageUrl: 'mock_url',
    onPress: jest.fn(),
    title: 'mock_title',
    id: 'mock_id',
    item: {},
    text: 'mock_text',
  };

  const createShallowRenderer = (passedProps = {}) => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<ListItem {...props} {...passedProps} />);
    return shallowRenderer.getRenderOutput();
  };

  const createTestRendererInstance = (passedProps = {}) => {
    return TestRenderer.create(<ListItem {...props} {...passedProps} />).getInstance();
  };

  let renderOutput;
  let testRendererInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    renderOutput = createShallowRenderer();
    testRendererInstance = createTestRendererInstance();
  });

  describe('test rendered output', () => {
    it('should render button container and child elements', () => {
      expect(renderOutput.type).toBe('button');

      const [image, textContainer] = renderOutput.props.children;
      expect(image.type).toBe('img');
      expect(textContainer.type).toBe('div');

      const [title, markdownText] = textContainer.props.children;
      expect(title.type).toBe('h1');
      expect(markdownText.type).toBe(ReactMarkdown);

    });
  });

  describe('test functional output', () => {
    it('should call onPress', () => {
      testRendererInstance.onClick();
      expect(props.onPress).toBeCalledWith(props.id);
    });
  })
})
