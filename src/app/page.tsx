import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="space-y-4 p-4">
      <Button variant={"elevated"}>I am Button</Button>
      <Input placeholder="Input" />
      <Progress value={50} />
      <Textarea placeholder="Textarea"/>
      <Checkbox />
    </div>
  );
}
