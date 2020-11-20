import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Example } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Example
        message="example"
        count={2}
        disabled
        names={[]}
        status="waiting"
        obj={{}}
        obj2={{}}
        obj3={{
          id: 'test',
        }}
        objArr={[]}
        dict1={{}}
        onSomething={() => null}
        onClick={() => null}
        onChange={() => null}
        onClickWithEvent={() => null}
        functionChildren={() => <div />}
        props={{ id: 'test2' }}
        props2={{ id: 'test3', title: 'hello!' }}
      >
        <div />
      </Example>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
