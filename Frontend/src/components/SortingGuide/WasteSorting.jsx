import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-hot-toast";
import { MapPin } from "lucide-react";

const mockResults = {
  Plastic: { type: "Plastic", confidence: 87, details: "Recycle it in designated plastic bins.", disposal: "Recycling Center" },
  Organic: { type: "Organic", confidence: 92, details: "Compost or dispose in organic waste bins.", disposal: "Composting Facility" },
  Paper: { type: "Paper", confidence: 85, details: "Recycle in paper bins.", disposal: "Paper Recycling Center" },
};

const wasteGuide = [
  { category: "Plastic", items: [{ name: "Bottle", disposal: "Recycling Bin" }, { name: "Bag", disposal: "Recycling Bin" }] },
  { category: "Organic", items: [{ name: "Banana Peel", disposal: "Compost Bin" }, { name: "Apple Core", disposal: "Compost Bin" }] },
  { category: "Paper", items: [{ name: "Newspaper", disposal: "Recycling Bin" }, { name: "Cardboard", disposal: "Recycling Bin" }] },
];

export default function WasteSorting() {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeWaste = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    setIsAnalyzing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const wasteTypes = Object.keys(mockResults);
      if (wasteTypes.length === 0) throw new Error("No waste types available.");
      const randomWasteType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      setResult(mockResults[randomWasteType] || {});
      toast.success("Waste analysis completed!");
    } catch (error) {
      toast.error("Failed to analyze image. Please try again.");
      console.error("Waste analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Waste Sorting Assistant</h1>
      <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <Button onClick={analyzeWaste} disabled={isAnalyzing} className="mt-4 w-full">
        {isAnalyzing ? "Analyzing..." : "Analyze Waste"}
      </Button>

      {result && typeof result === "object" && !Array.isArray(result) ? (
        <div className="mt-8 border rounded-lg overflow-hidden">
          <div className="p-4 text-center bg-blue-100">
            <h3 className="text-xl font-bold">{result.type}</h3>
            <div className="text-sm font-medium">Confidence: {result.confidence}%</div>
          </div>
          <div className="p-4">
            <Alert className="mb-4">
              <AlertDescription>{result.details}</AlertDescription>
            </Alert>
            <Button className="w-full">
              <MapPin size={18} className="mr-2" />
              Find Nearby {result.disposal} Locations
            </Button>
          </div>
        </div>
      ) : null}

      {Array.isArray(wasteGuide) && wasteGuide.length > 0 ? (
        <Accordion type="single" collapsible className="w-full mt-6">
          {wasteGuide.map((category, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{category.category}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {Array.isArray(category.items) && category.items.length > 0 ? (
                    category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item.disposal}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p>No items available</p>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="mt-4 text-gray-500">No waste guide data available</p>
      )}
    </div>
  );
}
