import {Card,CardContent, CardHeader} from "@/components/ui/card"
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel"
import messages from "@/messages.json";

export default function Home(){
    return (
        <>
         <main className="flex flex-col flex-grow items-center
                         justify-center px-4 md:px-24 py-12">
            <section className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-bold" >DIVE INTO THE WORLD OF ANONYMPUS CONVERSATIONS </h2>
                <p className="mt-3 md:mt-4 text-base">Explore Mystery Message - where your identity remains a secret</p>
            </section>

            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    { messages.map( (message,index)  => (
                    <CarouselItem key={index}>
                         <div className="p-1">
                            <Card>
                                <CardHeader>
                                    {message.title}
                                </CardHeader>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{message.content}</span>
                                </CardContent>
                            </Card>
                         </div>
                    </CarouselItem>
                    ))}
                       </CarouselContent>
                    <CarouselPrevious />
                <CarouselNext />
            </Carousel>

         </main>

         <footer className="text-center p-4 md:p-6">
            @2024 ANONYMOUS MESSAGING. ALL RIGHTS RESERVED 
         </footer>
        </>
    )
}