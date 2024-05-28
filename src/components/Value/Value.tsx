import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
	value: string | number
	decimals?: number
	unit?: string
	size?: number
	color?: string
	unitafter?: string
	fontweight?: string
}

const Value: React.FC<ValueProps> = ({ value, decimals, unit, size, color,unitafter, fontweight }) => {
	const [start, updateStart] = useState(0)
	const [end, updateEnd] = useState(0)
	useEffect(() => {
		if (typeof value === 'number') {
			updateStart(end)
			updateEnd(value)
		}
	}, [value])
	return (
		<StyledValue size={size} color={color} fontweight={fontweight}>
			{typeof value == 'string' ? (
				value
			) : (
				<>
					{unit}
					<CountUp
						start={start}
						end={end}
						decimals={
							decimals !== undefined
								? decimals
								: end < 9e-5
								? 9  
								: end < 1
								? 4 
								: end > 1e5 
								? 0 
								: 2 
						}
						duration={1}
						separator=","
					/>
					{unitafter}
				</>
			)}
		</StyledValue>
	)
}

interface StyledValueProps {
	size?: number
	color?: string
	fontweight?: string
}

const StyledValue = styled.span<StyledValueProps>`
	font-size: ${(props) => (props.size ? `${props.size}px` : '16px')};
	color: ${(props) => (props.color ? `${props.color}` : '#fff')};
	font-weight: ${(props) => (props.fontweight && `${props.fontweight}`)};
	span {
		padding-right: 3px;
	}
	@media screen and (min-width: 768px) and (max-width: 1023px) {
		font-size: 13px;
	}
`

export default Value
