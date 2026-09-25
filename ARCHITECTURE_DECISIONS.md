# Architecture Decisions

## ADR-001: Frontend-First Architecture

**Problem**: Need to build a comprehensive vehicle ecosystem platform with limited initial infrastructure.

**Options Considered**:
1. Full-stack from day one (Next.js + database)
2. Frontend-first with mock data layer
3. Backend-first API design

**Decision**: Frontend-first with comprehensive data store

**Reason**: 
- Enables rapid UI/UX iteration
- Demonstrates complete user flows
- Data layer can be swapped to real API later
- Allows testing all business logic before backend investment

**Trade-offs**: 
- No real persistence initially
- Must carefully design data interfaces for future migration
- Authentication is mock-only

---

## ADR-002: Vehicle as Central Entity

**Problem**: How to model the relationship between vehicles and listings.

**Decision**: Vehicle exists independently of listings. A vehicle has a Passport that persists across ownership changes and listing periods.

**Data Model**:
```
USER → VEHICLE → VEHICLE_PASSPORT → LISTING
                  ↓
            INSPECTION
            ODOMETER_HISTORY
            SERVICE_RECORD
            DOCUMENT_VERIFICATION
```

**Reason**: 
- Vehicles exist before and after being listed
- Passport follows the vehicle, not the seller
- Historical data must be preserved across ownership
- Prevents data loss when listings expire

---

## ADR-003: Verification Source Labels

**Problem**: How to distinguish between seller claims and verified facts.

**Decision**: Every significant data point records its verification source:
- SELLER_DECLARED
- DOCUMENT_CHECKED
- PHYSICALLY_VERIFIED
- PARTNER_VERIFIED
- GOVERNMENT_VERIFIED
- SYSTEM_GENERATED
- UNABLE_TO_VERIFY

**Reason**:
- Transparency for buyers
- Legal protection for platform
- Prevents misinformation
- Enables trust scoring

---

## ADR-004: Single Platform, Multiple Dashboards

**Problem**: How to serve different user types (buyers, sellers, dealers, inspectors, admin).

**Decision**: Single application with role-based routing and shared data layer.

**Reason**:
- Shared authentication
- Shared vehicle records
- Shared permissions
- Reduced code duplication
- Simpler deployment

**Trade-offs**:
- Larger bundle size
- Must carefully manage route access

---

## ADR-005: Inspection Template System

**Problem**: Different vehicle types require different inspection criteria.

**Decision**: Template-based inspection system with sections and items.

**Templates**:
- PETROL_CAR
- DIESEL_CAR
- ELECTRIC_CAR (includes battery/BMS checks)
- HYBRID_CAR
- MOTORCYCLE
- SCOOTER
- COMMERCIAL

**Each item supports**: PASS, ADVISORY, FAIL, NOT_APPLICABLE, UNABLE_TO_INSPECT

**Reason**:
- Standardized quality
- EV-specific checks (battery SOH, BMS, charging)
- Scalable for new vehicle types
- Enables quality control metrics

---

## ADR-006: Outside-Marketplace Inspection

**Problem**: Customers need inspections for vehicles not on the platform.

**Decision**: Independent inspection booking flow that doesn't require a listing.

**Workflow**: Customer enters vehicle info → selects package → books inspection → receives report → optional Passport creation

**Reason**:
- Larger addressable market
- Builds trust with new users
- Generates Passport data for future listings
- Revenue from inspection fees

---

## ADR-007: Immutable History Pattern

**Problem**: How to handle corrections to vehicle history without losing audit trail.

**Decision**: Never delete historical records. Corrections create new records with:
- Previous value
- Corrected value
- Reason
- Reviewer
- Timestamp

**Reason**:
- Legal compliance
- Fraud prevention
- Buyer protection
- Audit trail integrity

---

## ADR-008: Nepal-Specific Design Decisions

**Currency**: Nepali Rupee (Rs.) with Lakh/Crore formatting
**Locations**: Nepal districts and cities
**Phone**: Nepal mobile format (98XXXXXXXX)
**Registration**: Nepal format (BA 23 PA 4567)
**Payments**: eSewa, Khalti integration architecture
**Language**: English primary, Nepali planned

---

## ADR-009: Payment Abstraction

**Problem**: Multiple payment providers in Nepal with different APIs.

**Decision**: Create payment abstraction layer supporting:
- eSewa
- Khalti
- Bank Transfer

**Interface**:
```typescript
interface PaymentProvider {
  createPayment(amount, purpose, metadata): PaymentResult
  verifyPayment(reference): VerificationResult
  processRefund(reference): RefundResult
}
```

**Reason**:
- Provider-agnostic business logic
- Easy to add new providers
- Consistent payment state management
- Idempotency support

---

## ADR-010: Risk Management Architecture

**Problem**: How to detect and manage fraud without false accusations.

**Decision**: Risk scoring system with review queue. Never auto-accuse.

**Detection signals**:
- Duplicate listings/images
- Mileage inconsistencies
- Price anomalies
- Document mismatches
- Account behavior patterns

**Workflow**: Signal detected → Risk score calculated → Review queue → Human review → Action

**Reason**:
- Protects legitimate users
- Legal safety
- Reduces false positives
- Maintains platform trust
