import { render } from '@testing-library/react';
import ProfileContent from './ProfileContent';

let mockUserData = {
  profile: {
    name: null,
    description: null,
    disciplines: [],
  },
};

jest.mock('../contexts/UserContext', () => ({
  useUser: () => ({
    userData: mockUserData,
  }),
}));

test('Empty profile renders with fallback text', () => {
  const { getByTestId } = render(<ProfileContent />);

  const nameEl = getByTestId('name');
  expect(nameEl.textContent).toBe('Please update your profile');

  const descriptionEl = getByTestId('description');
  expect(descriptionEl.textContent).toBe(
    'Tell us some more about yourself. Whats your favorite climbs?'
  );
});

test('Profile renders with set name and description', () => {
  mockUserData = {
    profile: {
      name: 'Eric',
      description: 'Jag gillar att klättra.',
      disciplines: [],
    },
  };

  const { getByTestId } = render(<ProfileContent />);
  const nameEl = getByTestId('name');
  expect(nameEl.textContent).toBe('Eric');

  const descriptionEl = getByTestId('description');
  expect(descriptionEl.textContent).toBe('Jag gillar att klättra.');
});

test('Profile renders with set name and fallback description', () => {
  mockUserData = {
    profile: {
      name: 'Eric',
      description: null,
      disciplines: [],
    },
  };

  const { getByTestId } = render(<ProfileContent />);

  const nameEl = getByTestId('name');
  expect(nameEl.textContent).toBe('Eric');

  const descriptionEl = getByTestId('description');
  expect(descriptionEl.textContent).toBe(
    'Tell us some more about yourself. Whats your favorite climbs?'
  );
});

test('Profile renders with set desciption and fallback name helpertext', () => {
  mockUserData = {
    profile: {
      name: null,
      description: 'Jag gillar att klättra.',
      disciplines: [],
    },
  };

  const { getByTestId } = render(<ProfileContent />);

  const nameEl = getByTestId('name');
  expect(nameEl.textContent).toBe('Please update your profile');

  const descriptionEl = getByTestId('description');
  expect(descriptionEl.textContent).toBe('Jag gillar att klättra.');
});
