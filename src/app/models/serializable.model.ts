export interface Serializable {
	serialize(): string;
	deserialize(input: any): this;
}
