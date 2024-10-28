import { Container, ProductImage, Title, GroupVariants } from "@/shared/components/shared";
import prisma from "@/prisma/prisma-client"
import { notFound } from "next/navigation"
import { productSizes } from "@/shared/constants/pizza";

export default async function ProductPage({ params: { id } } : { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if(!product){
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage 
          imageUrl={product.imageUrl} 
          size={3}
        />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Culpa reiciendis repellendus, quisquam ducimus quidem eveniet 
            repudiandae ipsa, repellat soluta ea architecto nobis, 
            tenetur modi cum omnis nihil accusantium eius eligendi.
          </p>
          <GroupVariants items={productSizes} />
        </div>
      </div>
    </Container>
  )
}