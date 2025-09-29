module nyumba_hunt::property {
    use std::string::String;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;

    // Property struct representing a rental property
    struct Property has key, store {
        id: UID,
        title: String,
        location: String,
        price: u64, // Price in smallest unit (e.g., cents)
        bedrooms: u8,
        bathrooms: u8,
        parking: u8,
        property_type: String,
        description: String,
        landlord: address,
        is_available: bool,
        created_at: u64,
    }

    // Property listing event
    struct PropertyListed has copy, drop {
        property_id: ID,
        title: String,
        location: String,
        price: u64,
        landlord: address,
    }

    // Property rented event
    struct PropertyRented has copy, drop {
        property_id: ID,
        tenant: address,
        landlord: address,
        rent_amount: u64,
    }

    // Property availability changed event
    struct PropertyAvailabilityChanged has copy, drop {
        property_id: ID,
        is_available: bool,
    }

    // Create a new property listing
    public fun create_property(
        title: String,
        location: String,
        price: u64,
        bedrooms: u8,
        bathrooms: u8,
        parking: u8,
        property_type: String,
        description: String,
        ctx: &mut TxContext
    ): Property {
        let property = Property {
            id: object::new(ctx),
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            parking,
            property_type,
            description,
            landlord: tx_context::sender(ctx),
            is_available: true,
            created_at: tx_context::epoch_timestamp_ms(ctx),
        };

        // Emit property listed event
        event::emit(PropertyListed {
            property_id: object::id(&property),
            title: property.title,
            location: property.location,
            price: property.price,
            landlord: property.landlord,
        });

        property
    }

    // Update property availability
    public fun update_availability(
        property: &mut Property,
        is_available: bool,
    ) {
        property.is_available = is_available;
        
        event::emit(PropertyAvailabilityChanged {
            property_id: object::id(property),
            is_available,
        });
    }

    // Rent a property (simplified - in real app would handle payments)
    public fun rent_property(
        property: &mut Property,
        tenant: address,
    ) {
        assert!(property.is_available, 0); // Property must be available
        
        property.is_available = false;
        
        event::emit(PropertyRented {
            property_id: object::id(property),
            tenant,
            landlord: property.landlord,
            rent_amount: property.price,
        });
    }

    // Get property details
    public fun get_property_details(property: &Property): (String, String, u64, u8, u8, u8, String, String, address, bool, u64) {
        (
            property.title,
            property.location,
            property.price,
            property.bedrooms,
            property.bathrooms,
            property.parking,
            property.property_type,
            property.description,
            property.landlord,
            property.is_available,
            property.created_at,
        )
    }

    // Check if property is available
    public fun is_available(property: &Property): bool {
        property.is_available
    }

    // Get property landlord
    public fun get_landlord(property: &Property): address {
        property.landlord
    }

    // Transfer property ownership (for landlord changes)
    public fun transfer_property(
        property: Property,
        new_landlord: address,
        ctx: &mut TxContext
    ) {
        let Property { id, title, location, price, bedrooms, bathrooms, parking, property_type, description, landlord: _, is_available, created_at } = property;
        
        let new_property = Property {
            id,
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            parking,
            property_type,
            description,
            landlord: new_landlord,
            is_available,
            created_at,
        };
        
        transfer::transfer(new_property, new_landlord);
    }
}
