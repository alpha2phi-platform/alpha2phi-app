import { render, screen } from "@testing-library/react"
import { expect, test } from 'vitest'
import App from "../App"

test("App", () => {
  render(<App />)
  const titleElement = screen.getByRole('heading')
  expect(titleElement).toBeInTheDocument()
})
