module nyumba_hunt::property {

    use sui::object;
    use sui::tx_context;
    use sui::event;
    use sui::transfer;

    // Property struct: only key, store abilities (because it contains UID)
    struct Property has key, store {
        id: sui::object::UID,
        title: vector<u8>,
        location: vector<u8>,
        price: u64,
        bedrooms: u8,
        bathrooms: u8,
        parking: bool,
        property_type: vector<u8>,
        description: vector<u8>,
        landlord: address,
        is_available: bool,
        created_at: u64
    }

    // Event structs: can have copy, drop, store (no UID, just ID)
    struct PropertyListed has copy, drop, store {
        property_id: sui::object::ID,
    }

    struct PropertyAvailabilityChanged has copy, drop, store {
        property_id: sui::object::ID,
        is_available: bool,
    }

    struct PropertyRented has copy, drop, store {
        property_id: sui::object::ID,
        tenant: address,
    }

    // Create a new property and transfer it to the sender
    public entry fun create_property(
        title: vector<u8>,
        location: vector<u8>,
        price: u64,
        bedrooms: u8,
        bathrooms: u8,
        parking: bool,
        property_type: vector<u8>,
        description: vector<u8>,
        ctx: &mut tx_context::TxContext
    ) {
        let landlord = tx_context::sender(ctx);
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
            landlord,
            is_available: true,
            created_at: tx_context::epoch_timestamp_ms(ctx),
        };
        event::emit(PropertyListed { property_id: object::id(&property) });
        transfer::public_transfer(property, landlord);
    }

    // Update property: delete old, create new
    public fun update_property(
        property: Property,
        title: vector<u8>,
        location: vector<u8>,
        price: u64,
        bedrooms: u8,
        bathrooms: u8,
        parking: bool,
        property_type: vector<u8>,
        description: vector<u8>,
        ctx: &mut tx_context::TxContext
    ): Property {
        let Property { id, .. } = property;
        object::delete(id);
        let new_property = Property {
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
        event::emit(PropertyListed { property_id: object::id(&new_property) });
        new_property
    }

    // Set availability: delete old, create new
    public fun set_availability(
        property: Property,
        is_available: bool,
        ctx: &mut tx_context::TxContext
    ): Property {
        let Property {
            id, title, location, price, bedrooms, bathrooms, parking, property_type, description, landlord, created_at, ..
        } = property;
        object::delete(id);
        let new_property = Property {
            id: object::new(ctx),
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            parking,
            property_type,
            description,
            landlord,
            is_available,
            created_at,
        };
        event::emit(PropertyAvailabilityChanged {
            property_id: object::id(&new_property),
            is_available
        });
        new_property
    }

    // Rent property: delete old, create new
    public fun rent_property(
        property: Property,
        tenant: address,
        ctx: &mut tx_context::TxContext
    ): Property {
        let Property {
            id, title, location, price, bedrooms, bathrooms, parking, property_type, description, landlord, created_at, ..
        } = property;
        object::delete(id);
        let new_property = Property {
            id: object::new(ctx),
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            parking,
            property_type,
            description,
            landlord,
            is_available: false,
            created_at,
        };
        event::emit(PropertyRented {
            property_id: object::id(&new_property),
            tenant
        });
        new_property
    }

    // Delete property: must destructure and delete UID
    public fun delete_property(property: Property) {
        let Property { id, .. } = property;
        object::delete(id);
    }
}
