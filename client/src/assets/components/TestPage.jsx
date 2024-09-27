import React from 'react'
import ProductCard from './ProductCard'

const TestPage = () => {
  const product = {image:"/assets/icons/agurk.webp", name:"agurk"}
  return (
    <div>
        <ProductCard product={product} />
    </div>
  )
}

export default TestPage