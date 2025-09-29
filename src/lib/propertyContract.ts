import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { useCurrentWallet } from '@mysten/dapp-kit';

// Smart contract configuration
const PACKAGE_ID = import.meta.env.VITE_SUI_PACKAGE_ID || '0x0'; // Replace with actual package ID after deployment
const PROPERTY_MODULE = 'property';

export interface PropertyData {
  title: string;
  location: string;
  price: number; // in smallest unit (e.g., cents)
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propertyType: string;
  description: string;
}

export interface PropertyDetails {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propertyType: string;
  description: string;
  landlord: string;
  isAvailable: boolean;
  createdAt: number;
}

export class PropertyContractService {
  private client: SuiClient;
  private packageId: string;

  constructor(client: SuiClient, packageId: string = PACKAGE_ID) {
    this.client = client;
    this.packageId = packageId;
  }

  /**
   * Create a new property listing on-chain
   */
  async createProperty(
    propertyData: PropertyData,
    signAndExecuteTransactionBlock: (txb: TransactionBlock) => Promise<{ digest: string }>
  ): Promise<string> {
    const txb = new TransactionBlock();
    
    txb.moveCall({
      target: `${this.packageId}::${PROPERTY_MODULE}::create_property`,
      arguments: [
        txb.pure.string(propertyData.title),
        txb.pure.string(propertyData.location),
        txb.pure.u64(propertyData.price),
        txb.pure.u8(propertyData.bedrooms),
        txb.pure.u8(propertyData.bathrooms),
        txb.pure.u8(propertyData.parking),
        txb.pure.string(propertyData.propertyType),
        txb.pure.string(propertyData.description),
      ],
    });

    const result = await signAndExecuteTransactionBlock(txb);
    return result.digest;
  }

  /**
   * Update property availability
   */
  async updatePropertyAvailability(
    propertyId: string,
    isAvailable: boolean,
    signAndExecuteTransactionBlock: (txb: TransactionBlock) => Promise<{ digest: string }>
  ): Promise<string> {
    const txb = new TransactionBlock();
    
    txb.moveCall({
      target: `${this.packageId}::${PROPERTY_MODULE}::update_availability`,
      arguments: [
        txb.object(propertyId),
        txb.pure.bool(isAvailable),
      ],
    });

    const result = await signAndExecuteTransactionBlock(txb);
    return result.digest;
  }

  /**
   * Rent a property
   */
  async rentProperty(
    propertyId: string,
    tenantAddress: string,
    signAndExecuteTransactionBlock: (txb: TransactionBlock) => Promise<{ digest: string }>
  ): Promise<string> {
    const txb = new TransactionBlock();
    
    txb.moveCall({
      target: `${this.packageId}::${PROPERTY_MODULE}::rent_property`,
      arguments: [
        txb.object(propertyId),
        txb.pure.address(tenantAddress),
      ],
    });

    const result = await signAndExecuteTransactionBlock(txb);
    return result.digest;
  }

  /**
   * Get property details from on-chain data
   */
  async getPropertyDetails(propertyId: string): Promise<PropertyDetails | null> {
    try {
      const object = await this.client.getObject({
        id: propertyId,
        options: {
          showContent: true,
        },
      });

      if (!object.data?.content || 'fields' in object.data.content === false) {
        return null;
      }

      const fields = object.data.content.fields as Record<string, unknown>;
      
      return {
        title: fields.title as string,
        location: fields.location as string,
        price: parseInt(fields.price as string),
        bedrooms: parseInt(fields.bedrooms as string),
        bathrooms: parseInt(fields.bathrooms as string),
        parking: parseInt(fields.parking as string),
        propertyType: fields.property_type as string,
        description: fields.description as string,
        landlord: fields.landlord as string,
        isAvailable: fields.is_available as boolean,
        createdAt: parseInt(fields.created_at as string),
      };
    } catch (error) {
      console.error('Error fetching property details:', error);
      return null;
    }
  }

  /**
   * Check if property is available
   */
  async isPropertyAvailable(propertyId: string): Promise<boolean> {
    try {
      const object = await this.client.getObject({
        id: propertyId,
        options: {
          showContent: true,
        },
      });

      if (!object.data?.content || 'fields' in object.data.content === false) {
        return false;
      }

      const fields = object.data.content.fields as Record<string, unknown>;
      return fields.is_available as boolean;
    } catch (error) {
      console.error('Error checking property availability:', error);
      return false;
    }
  }

  /**
   * Get all properties owned by a specific address
   */
  async getPropertiesByOwner(ownerAddress: string): Promise<string[]> {
    try {
      const objects = await this.client.getOwnedObjects({
        owner: ownerAddress,
        filter: {
          StructType: `${this.packageId}::${PROPERTY_MODULE}::Property`,
        },
        options: {
          showContent: true,
        },
      });

      return objects.data.map(obj => obj.data?.objectId || '').filter(Boolean);
    } catch (error) {
      console.error('Error fetching properties by owner:', error);
      return [];
    }
  }

  /**
   * Get all available properties
   */
  async getAllAvailableProperties(): Promise<string[]> {
    try {
      // This would require indexing or events in a real implementation
      // For now, we'll return an empty array
      // In production, you'd use an indexer or query events
      return [];
    } catch (error) {
      console.error('Error fetching all available properties:', error);
      return [];
    }
  }
}

// Hook for using the property contract service
export function usePropertyContract() {
  const { currentWallet } = useCurrentWallet();
  
  const getClient = () => {
    // Return Sui client instance
    // You might want to get this from context or create it here
    return new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });
  };

  const getSignAndExecuteTransactionBlock = () => {
    if (!currentWallet) {
      throw new Error('No wallet connected');
    }
    
    return currentWallet.signAndExecuteTransactionBlock;
  };

  return {
    propertyContract: new PropertyContractService(getClient()),
    signAndExecuteTransactionBlock: getSignAndExecuteTransactionBlock(),
    isConnected: !!currentWallet,
  };
}
