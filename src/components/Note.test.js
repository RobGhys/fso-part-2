import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // render() returns a special object that allows us to test the component
    const component = render(
        <Note note={note} />
    )

    // Print html code to the console
    component.debug()

    const li = component.container.querySelector('li')
    // search for a smaller part of the component and print its HTML code
    console.log(prettyDOM(li))

    // search for a matching text from the entire HTML code rendered by the component
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )

    // returns the element that contains the given text
    const element = component.getByText(
        'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()

    // search for a specific element that is rendered by the component
    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // use a mock for the event handler
    const mockHandler = jest.fn()

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const button = component.getByText('make not important')
    fireEvent.click(button)

    // verifies that the mock function has been called exactly once
    expect(mockHandler.mock.calls).toHaveLength(1)
})