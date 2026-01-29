import { NextResponse, NextRequest } from 'next/server';
import { mockVendors } from '../data';

export async function GET(request: NextRequest, context: { params: Promise<{ vendorSlug: string }> | { vendorSlug: string } }) {
  try {
    // Handle both Promise and direct object for params
    const resolvedParams = await Promise.resolve(context.params);
    const { vendorSlug } = resolvedParams;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const vendor = mockVendors.find(v => v.slug === vendorSlug);

    if (!vendor) {
      return NextResponse.json(
        {
          success: false,
          message: `Vendor with slug '${vendorSlug}' not found`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vendor,
      message: 'Vendor retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve vendor',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}