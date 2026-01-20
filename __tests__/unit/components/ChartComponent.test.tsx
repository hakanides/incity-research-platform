import { render, screen } from '@testing-library/react'
import { ChartComponent } from '@/components/charts/ChartComponent'
import {
  mockBarChartData,
  mockLineChartData,
  mockPieChartData,
  mockAreaChartData,
  mockEmptyChartData,
  mockChartDataWithZeros,
} from '@/__tests__/mocks/mockData'
import type { ChartData } from '@/types'

// Mock ResizeObserver for Recharts ResponsiveContainer
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('ChartComponent', () => {
  describe('Empty state handling', () => {
    it('renders empty state when data is null', () => {
      render(<ChartComponent data={null as unknown as ChartData} />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders empty state when data is undefined', () => {
      render(<ChartComponent data={undefined as unknown as ChartData} />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders empty state when data array is empty', () => {
      render(<ChartComponent data={mockEmptyChartData} />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('has correct aria-label for empty chart', () => {
      render(<ChartComponent data={mockEmptyChartData} />)
      expect(screen.getByRole('img', { name: 'Empty chart' })).toBeInTheDocument()
    })
  })

  describe('Bar Chart', () => {
    it('renders bar chart with title', () => {
      render(<ChartComponent data={mockBarChartData} />)
      expect(screen.getByText('Publications by Year')).toBeInTheDocument()
    })

    it('has correct aria-label', () => {
      render(<ChartComponent data={mockBarChartData} />)
      expect(screen.getByRole('img', { name: 'Publications by Year' })).toBeInTheDocument()
    })

    it('renders with custom height', () => {
      const { container } = render(<ChartComponent data={mockBarChartData} height={400} />)
      const responsiveContainer = container.querySelector('.recharts-responsive-container')
      expect(responsiveContainer).toBeInTheDocument()
    })
  })

  describe('Line Chart', () => {
    it('renders line chart with title', () => {
      render(<ChartComponent data={mockLineChartData} />)
      expect(screen.getByText('Monthly Website Traffic')).toBeInTheDocument()
    })

    it('has correct aria-label', () => {
      render(<ChartComponent data={mockLineChartData} />)
      expect(screen.getByRole('img', { name: 'Monthly Website Traffic' })).toBeInTheDocument()
    })
  })

  describe('Pie Chart', () => {
    it('renders pie chart with title', () => {
      render(<ChartComponent data={mockPieChartData} />)
      expect(screen.getByText('Research Themes Distribution')).toBeInTheDocument()
    })

    it('has correct aria-label', () => {
      render(<ChartComponent data={mockPieChartData} />)
      expect(screen.getByRole('img', { name: 'Research Themes Distribution' })).toBeInTheDocument()
    })
  })

  describe('Area Chart', () => {
    it('renders area chart with title', () => {
      render(<ChartComponent data={mockAreaChartData} />)
      expect(screen.getByText('Funding Over Time')).toBeInTheDocument()
    })

    it('has correct aria-label', () => {
      render(<ChartComponent data={mockAreaChartData} />)
      expect(screen.getByRole('img', { name: 'Funding Over Time' })).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles data with zero values', () => {
      render(<ChartComponent data={mockChartDataWithZeros} />)
      expect(screen.getByText('Chart with Zero Values')).toBeInTheDocument()
    })

    it('renders with default aria-label when no title', () => {
      const dataWithoutTitle: ChartData = {
        chartType: 'bar',
        data: [{ label: 'A', value: 10 }],
      }
      render(<ChartComponent data={dataWithoutTitle} />)
      expect(screen.getByRole('img', { name: 'Chart' })).toBeInTheDocument()
    })

    it('displays unsupported chart type message', () => {
      const invalidData = {
        chartType: 'invalid' as ChartData['chartType'],
        data: [{ label: 'A', value: 10 }],
      }
      render(<ChartComponent data={invalidData} />)
      expect(screen.getByText('Unsupported chart type: invalid')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <ChartComponent data={mockBarChartData} className="custom-chart" />
      )
      expect(container.firstChild).toHaveClass('custom-chart')
    })

    it('applies w-full class by default', () => {
      const { container } = render(<ChartComponent data={mockBarChartData} />)
      expect(container.firstChild).toHaveClass('w-full')
    })

    it('applies custom colors', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff']
      const { container } = render(
        <ChartComponent data={mockBarChartData} colors={customColors} />
      )
      expect(container).toBeInTheDocument()
    })
  })

  describe('Title rendering', () => {
    it('renders title with correct styles', () => {
      render(<ChartComponent data={mockBarChartData} />)
      const title = screen.getByText('Publications by Year')
      expect(title.tagName).toBe('H3')
      expect(title).toHaveClass('text-lg')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('text-center')
    })

    it('does not render title element when no title provided', () => {
      const dataWithoutTitle: ChartData = {
        chartType: 'bar',
        data: [{ label: 'A', value: 10 }],
      }
      const { container } = render(<ChartComponent data={dataWithoutTitle} />)
      expect(container.querySelector('h3')).not.toBeInTheDocument()
    })
  })
})
