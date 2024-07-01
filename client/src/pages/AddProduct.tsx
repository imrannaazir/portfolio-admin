import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import {
  TProductFormValues,
  createProductValidationSchema,
} from "@/schemas/product.schema";
import TextEditor from "@/components/ui/text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductStatus, ProductUnit } from "@/constant/product.constant";
import AddVariant from "@/components/forms/product/AddVariant";
import SelectCollections from "@/components/forms/product/SelectCollections";
import SelectCategories from "@/components/forms/product/SelectCategories";
import SelectBrand from "@/components/forms/product/SelectBrand";
import SelectTags from "@/components/forms/product/SelectTags";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(createProductValidationSchema),
  });

  // on submit handler
  const onSubmit = async (data: TProductFormValues) => {
    console.log({ data });

    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createProduct(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/products");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Product" action={<Action />}>
          {/* form content */}
          <div className="flex gap-4">
            <div className="w-[66%] space-y-6">
              {/* basic info */}
              <PageSection className="space-y-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Fruits, Vegetables"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <TextEditor
                        setValue={form.setValue}
                        value={field.value || ""}
                      />
                    </FormItem>
                  )}
                />
              </PageSection>

              {/* media */}
              <PageSection>
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Media</FormLabel>
                      <UploadSingleImage
                        fieldName="media"
                        setValue={form.setValue}
                        type="multi"
                        fieldValue={field.value || []}
                      />
                    </FormItem>
                  )}
                />
              </PageSection>

              {/* Pricing */}
              <PageSection title="Pricing">
                <div className="flex space-x-4 mt-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400]">Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="compare_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400]">
                          Compare price
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </PageSection>

              {/* Inventory */}
              <PageSection title="Inventory">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-[200px]">
                      <FormLabel className="font-[200]">Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PageSection>

              {/* Shipping */}
              <PageSection title="Shipping">
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[200]">Weight</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="w-[200px]">
                        <FormLabel className="font-[200]">Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ProductUnit.map((item) => (
                              <SelectItem value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </PageSection>

              {/* Variants */}
              <PageSection title="Variants">
                <FormField
                  control={form.control}
                  name="variants"
                  render={() => (
                    <FormItem className="mt-2">
                      <AddVariant form={form} />
                    </FormItem>
                  )}
                />
              </PageSection>
            </div>
            {/* right side */}
            <div className=" flex-grow space-y-6 ">
              {/* status */}
              <PageSection>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ProductStatus.map((item) => (
                            <SelectItem value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PageSection>

              <PageSection
                title="Product organization
"
              >
                <SelectCollections form={form} />
                <SelectCategories form={form} />
                <SelectBrand form={form} />
                <SelectTags form={form} />
              </PageSection>
            </div>
          </div>
        </Page>
      </form>
    </Form>
  );
};

const Action = () => {
  return <Button size={"sm"}>Save</Button>;
};

export default AddProductPage;
