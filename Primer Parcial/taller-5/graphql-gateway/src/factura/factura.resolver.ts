import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FacturaService } from './factura.service';
import { Factura } from './entities/factura.entity';
import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';

@Resolver(() => Factura)
export class FacturaResolver {
  constructor(private readonly facturaService: FacturaService) {}

  @Mutation(() => Factura)
  createFactura(@Args('createFacturaInput') createFacturaInput: CreateFacturaInput) {
    return this.facturaService.create(createFacturaInput);
  }

  @Query(() => [Factura], { name: 'factura' })
  findAll() {
    return this.facturaService.findAll();
  }

  @Query(() => Factura, { name: 'factura' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facturaService.findOne(id);
  }

  @Mutation(() => Factura)
  updateFactura(@Args('updateFacturaInput') updateFacturaInput: UpdateFacturaInput) {
    return this.facturaService.update(updateFacturaInput.id, updateFacturaInput);
  }

  @Mutation(() => Factura)
  removeFactura(@Args('id', { type: () => Int }) id: number) {
    return this.facturaService.remove(id);
  }
}
