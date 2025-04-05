import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoungeCard from './loungeCard';

describe('LoungeCard', () => {
  it('displays correct props', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        {/* <LoungeCard member_count={90} name="Testing" icon="mockImage.png" /> */}
      </MemoryRouter>
    );
    const title = getByTestId('title').textContent;
    expect(title).toEqual('Testing');
  });
});