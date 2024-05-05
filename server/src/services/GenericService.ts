import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";

class GenericService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(page: number, limit: number): Promise<T[]> {
    try {
      const items = await this.model
        .find()
        .skip(limit * (page - 1))
        .limit(limit);
      return items;
    } catch (error) {
      throw new Error(`Error fetching items: ${error}`);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const newItem = new this.model(data);
      const savedItem = await newItem.save();
      return savedItem;
    } catch (error) {
      throw new Error(`Error creating item: ${error}`);
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const item = await this.model.findById(id);
      return item;
    } catch (error) {
      throw new Error(`Error fetching item: ${error}`);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(id, data, { new: true });
      return updatedItem;
    } catch (error) {
      throw new Error(`Error updating item: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting item: ${error}`);
    }
  }
}

export default GenericService;
